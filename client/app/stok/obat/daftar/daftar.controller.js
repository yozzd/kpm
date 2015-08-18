'use strict';

angular.module('kpmApp')
    .controller('StokDaftarObatCtrl', function ($scope, Restangular, socket, $alert, uiGridConstants, $modal) {

        var date = new Date();
        $scope.bulan = date.getMonth();
        $scope.tahun = date.getFullYear();

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);
        $scope.b = {
            selected: $scope.bulans[$scope.bulan]
        };
        $scope.t = {
            selected: $scope.tahun
        };

        $scope.getObat = function (b, t) {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = _.filter(datas, function (value) {
                    return value.bulan === b.toString() && value.tahun === t.toString();
                });
                $scope.gridOptions.data = $scope.datas;
                socket.syncUpdates('obat', $scope.gridOptions.data);
            });
        };

        $scope.getObat($scope.bulan, $scope.tahun);

        $scope.get = function (b, t) {
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getObat($scope.bulan, $scope.tahun);
        };

        $scope.gridOptions = {};
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.enableColumnResizing = true;
        $scope.gridOptions.showGridFooter = true;

        $scope.gridOptions.columnDefs = [
            {
                name: 'index',
                displayName: 'No',
                enableColumnMenu: false,
                enableFiltering: false,
                pinnedLeft: true,
                cellTemplate: 'app/stok/obat/daftar/template/index.html',
                width: 50
            }, {
                name: 'obat',
                displayName: 'Nama Obat',
                enableColumnMenu: false,
                pinnedLeft: true,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0,
                },
                width: 200
            }, {
                name: 'satuan',
                displayName: 'Satuan Obat',
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'pindahan',
                displayName: 'Pindahan',
                enableColumnMenu: false,
                width: 100
            }, {
                name: 'masuk',
                displayName: 'Masuk',
                enableColumnMenu: false,
                width: 100
            }, {
                name: 'timestamp',
                displayName: '',
                enableColumnMenu: false,
                enableSorting: false,
                enableFiltering: false,
                cellTemplate: 'app/stok/obat/daftar/template/timestamp.html',
                width: 350,
            }, {
                name: 'edit',
                displayName: '',
                enableColumnMenu: false,
                enableSorting: false,
                enableFiltering: false,
                pinnedRight: true,
                cellTemplate: 'app/stok/obat/daftar/template/edit.html',
                width: 100,
            }, {
                name: 'delete',
                displayName: '',
                enableColumnMenu: false,
                enableSorting: false,
                enableFiltering: false,
                pinnedRight: true,
                cellTemplate: 'app/stok/obat/daftar/template/delete.html',
                width: 100,
            }
        ];

        $scope.deletemodal = function (data) {
            var scope = $scope.$new();
            scope.data = {
                id: data._id,
                obat: data.obat
            };
            var deletemodal = $modal({
                scope: scope,
                template: 'app/stok/obat/daftar/template/deletemodal.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            deletemodal.$promise.then(deletemodal.show);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('obat');
        });

    });
