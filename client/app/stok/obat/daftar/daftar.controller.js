'use strict';

angular.module('kpmApp')
    .controller('StokDaftarObatCtrl', function ($scope, Restangular, socket, $alert, uiGridConstants) {

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
                displayName: 'No.',
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
                pinnedLeft: true,
                width: 150
            }, {
                name: 'pindahan',
                displayName: 'Pindahan',
                enableColumnMenu: false,
                pinnedLeft: true,
                width: 100
            }, {
                name: 'masuk',
                displayName: 'Masuk',
                enableColumnMenu: false,
                pinnedLeft: true,
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
                name: 'delete',
                displayName: '',
                enableColumnMenu: false,
                enableFiltering: false,
                cellTemplate: 'app/stok/obat/daftar/template/delete.html',
                width: 100,
            }
        ];

        $scope.delete = function (id) {
            Restangular.one('obats').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $scope.getObat();
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('obat');
        });

    });
