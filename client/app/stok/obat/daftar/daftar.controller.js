'use strict';

angular.module('kpmApp')
    .controller('StokDaftarObatCtrl', function ($scope, Restangular, socket, $alert, uiGridConstants) {

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.gridOptions.data = datas;
                socket.syncUpdates('obat', $scope.gridOptions.data);
            });
        };

        $scope.getObat();

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
                name: 'nama',
                displayName: 'Nama Obat',
                enableColumnMenu: false,
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
