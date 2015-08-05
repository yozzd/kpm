'use strict';

angular.module('kpmApp')
    .controller('RekamKartuKontrolCtrl', function ($scope, Restangular, $stateParams, socket, $alert, $modal, uiGridConstants) {

        $scope.getData = function () {
            Restangular.one('kartukontrols').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                /*socket.syncUpdates('kartukontrol', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });*/
                $scope.gridOptions.data = $scope.data.kontrol;
                socket.syncUpdates('kartukontrol', $scope.gridOptions.data);
            });
        };

        $scope.getData();

        $scope.gridOptions = {};
        $scope.gridOptions.enableFiltering = true;
        $scope.gridOptions.enableColumnResizing = true;
        $scope.gridOptions.showGridFooter = true;
        $scope.gridOptions.rowHeight = 120;

        $scope.gridOptions.columnDefs = [
            {
                name: 'index',
                displayName: 'No.',
                enableColumnMenu: false,
                enableFiltering: false,
                pinnedLeft: true,
                cellTemplate: 'app/rekam/main/kartukontrol/template/index.html',
                width: 50
            }, {
                name: 'tanggal',
                displayName: 'Tanggal',
                enableColumnMenu: false,
                enableFiltering: false,
                pinnedLeft: true,
                sort: {
                    direction: uiGridConstants.ASC,
                    priority: 0,
                },
                cellTemplate: 'app/rekam/main/kartukontrol/template/tanggal.html',
                width: 150
            }, {
                name: 'image',
                displayName: 'Pemeriksaan',
                enableColumnMenu: false,
                enableFiltering: false,
                pinnedLeft: true,
                cellTemplate: 'app/rekam/main/kartukontrol/template/image.html',
                width: 150
            }, {
                name: 'keluhan',
                displayName: 'Keluhan',
                enableFiltering: false,
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'lab',
                displayName: 'Lab',
                enableFiltering: false,
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'sputum',
                displayName: 'Sputum',
                enableFiltering: false,
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'mt',
                displayName: 'Mt Tes',
                enableFiltering: false,
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'berat',
                displayName: 'Berat Badan (kg)',
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'tinggi',
                displayName: 'Tinggi Badan (cm)',
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'diagnosa',
                displayName: 'Diagnosa',
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'terapi',
                displayName: 'Terapi',
                enableFiltering: false,
                enableColumnMenu: false,
                width: 150
            }, {
                name: 'edit',
                displayName: '',
                enableColumnMenu: false,
                enableFiltering: false,
                cellTemplate: 'app/rekam/main/kartukontrol/template/edit.html',
                width: 150,
            }
        ];

        $scope.imgmodal = function (image) {
            var scope = $scope.$new();
            scope.data = {
                image: image
            };
            var imgmodal = $modal({
                scope: scope,
                template: 'app/rekam/main/kartukontrol/template.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            imgmodal.$promise.then(imgmodal.show);
        };

        $scope.rem = function (id) {
            Restangular.one('kartukontrols/rem').customPUT({
                id: id
            }, $scope.data._id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
                $scope.getData();
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('kartukontrol');
        });

    });
