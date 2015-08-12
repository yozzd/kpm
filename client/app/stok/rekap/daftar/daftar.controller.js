'use strict';

angular.module('kpmApp')
    .controller('StokDaftarRekapCtrl', function ($scope, Restangular, socket, $alert, uiGridConstants) {

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
            Restangular.all('rekaps').customGETLIST().then(function (datas) {

                $scope.filter = _.filter(datas, function (value) {
                    return value.bulan === b && value.tahun === t;
                });

                $scope.gridOptions.data = $scope.filter;
                socket.syncUpdates('rekap', $scope.gridOptions.data);
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
                cellTemplate: 'app/stok/rekap/daftar/template/index.html',
                width: 50
            }, {
                name: 'nama',
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
                name: 'keluar',
                displayName: 'Keluar',
                enableColumnMenu: false,
                width: 100
            }, {
                name: 'sisa',
                displayName: 'Sisa',
                enableColumnMenu: false,
                width: 100
            }, {
                name: 'timestamp',
                displayName: '',
                enableColumnMenu: false,
                enableSorting: false,
                enableFiltering: false,
                cellTemplate: 'app/stok/rekap/daftar/template/timestamp.html',
                width: 350,
            }, {
                name: 'edit',
                displayName: '',
                enableColumnMenu: false,
                enableFiltering: false,
                cellTemplate: 'app/stok/rekap/daftar/template/edit.html',
                width: 100,
            }, {
                name: 'delete',
                displayName: '',
                enableColumnMenu: false,
                enableFiltering: false,
                cellTemplate: 'app/stok/rekap/daftar/template/delete.html',
                width: 100,
            }
        ];

        $scope.delete = function (id, b, t) {
            Restangular.one('rekaps').customDELETE(id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $scope.bulan = _.indexOf($scope.bulans, b);
                $scope.tahun = t;
                $scope.getObat($scope.bulan, $scope.tahun);
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('rekap');
        });

    });
