'use strict';

angular.module('kpmApp')
    .controller('RekamDaftarCtrl', function ($scope, Restangular, socket, uiGridConstants) {

        $scope.getData = function () {
            Restangular.all('pasiens').customGETLIST().then(function (datas) {
                $scope.gridOptions.data = datas;
                socket.syncUpdates('pasien', $scope.gridOptions.data);
            });
        };

        $scope.getData();

        $scope.gridOptions = {};
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.enableColumnResizing = true;
        $scope.gridOptions.showGridFooter = true;

        $scope.gridOptions.columnDefs = [
            {
                name: 'nomor',
                displayName: 'Nomor',
                enableColumnMenu: false,
                pinnedLeft: true,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0,
                },
                width: 100
            },
            {
                name: 'tanggal',
                displayName: 'Tanggal',
                enableColumnMenu: false,
                enableFiltering: false,
                pinnedLeft: true,
                cellTemplate: 'app/rekam/daftar/template/tanggal.html',
                width: 100
            },
            {
                name: 'nama',
                displayName: 'Nama',
                enableColumnMenu: false,
                pinnedLeft: true,
                cellTemplate: 'app/rekam/daftar/template/nama.html',
                width: 150
            },
            {
                name: 'umur',
                displayName: 'Umur',
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'jeniskelamin',
                displayName: 'Jenis Kelamin',
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'jalan',
                displayName: 'Jalan',
                enableColumnMenu: false,
                width: 200
            },
            {
                name: 'lingkungan',
                displayName: 'Lingkungan',
                enableColumnMenu: false,
                width: 150
            },
            {
                name: 'kelkec',
                displayName: 'Kelurahan / Kecamatan',
                enableColumnMenu: false,
                width: 150
            },
            {
                name: 'kotkab',
                displayName: 'Kota / Kabupaten',
                enableColumnMenu: false,
                width: 150
            },
            {
                name: 'provinsi',
                displayName: 'Provinsi',
                enableColumnMenu: false,
                width: 150
            },
            {
                name: 'telp',
                displayName: 'No. Telp. / HP',
                enableColumnMenu: false,
                width: 150
            },
            {
                name: 'suku',
                displayName: 'Suku',
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'agama',
                displayName: 'Agama',
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'pekerjaan',
                displayName: 'Pekerjaan',
                enableColumnMenu: false,
                width: 150
            },
            {
                name: 'statuskeluarga',
                displayName: 'Status Keluarga',
                enableColumnMenu: false,
                width: 100
            },
            {
                name: 'dikirim',
                displayName: 'Dikirim / Konsul dari',
                enableColumnMenu: false,
                cellTemplate: 'app/rekam/daftar/template/dikirim.html',
                width: 250
            },
            {
                name: 'pembiayaan',
                displayName: 'Pembiayaan',
                enableColumnMenu: false,
                cellTemplate: 'app/rekam/daftar/template/pembiayaan.html',
                width: 250
            },
            {
                name: 'timestamp',
                displayName: '',
                enableColumnMenu: false,
                enableSorting: false,
                enableFiltering: false,
                cellTemplate: 'app/rekam/daftar/template/timestamp.html',
                width: 350,
            },
            {
                name: 'edit',
                displayName: 'Edit',
                enableColumnMenu: false,
                enableFiltering: false,
                cellTemplate: '<button type="button" ng-click="grid.appScope.edit(row.entity._id)" class="ui-grid-cell-contents">Edit</button>',
                width: 100,
            }
        ];

        $scope.edit = function (x) {
            console.log(x);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('pasien');
        });

    });