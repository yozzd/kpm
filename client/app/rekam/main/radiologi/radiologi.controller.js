'use strict';

angular.module('kpmApp')
    .controller('RekamRadiologiCtrl', function ($scope, Restangular, $stateParams, socket, $alert, Upload, $modal, $sce, $window) {

        $scope.getData = function () {
            Restangular.one('radiologis').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                if ($scope.data.imagetype === 'image/svg+xml') {
                    $scope.image = 'data:image/svg+xml;base64,' + $scope.data.image + '';
                    $scope.imagesrc = $sce.trustAsUrl('data:image/svg+xml;base64,' + $scope.data.image + '');
                } else {
                    $scope.image = 'data:image/png;base64,' + $scope.data.image + '';
                    $scope.imagesrc = $sce.trustAsUrl('data:image/png;base64,' + $scope.data.image + '');
                }

                socket.syncUpdates('radiologi', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.progresszero = function () {
            $scope.progress = 0;
        };

        $scope.upload = function (files, data) {
            if (files === undefined) {
                Restangular.one('radiologis').customPUT(data, $scope.data._id).then(function () {
                    $alert({
                        content: 'Data sukses diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            } else {
                if (files !== null) {
                    Upload.upload({
                        url: '/api/radiologis/files/' + $scope.data._id,
                        file: files,
                        method: 'PUT',
                        fields: {
                            thorakpatgl: data.thorakpatgl,
                            thorakpahasil: data.thorakpahasil,
                            thorakcttgl: data.thorakcttgl,
                            thorakcthasil: data.thorakcthasil,
                            thorakusgtgl: data.thorakusgtgl,
                            thorakusghasil: data.thorakusghasil
                        },
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
                        //$window.location.reload();
                        $scope.getData();
                        $alert({
                            content: 'Data sukses diupdate',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    });
                }
            }
        };

        $scope.imgmodal = function () {
            var scope = $scope.$new();
            var imgmodal = $modal({
                scope: scope,
                template: 'app/rekam/main/radiologi/template.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            imgmodal.$promise.then(imgmodal.show);
        };

        $scope.delimg = function () {
            Restangular.one('radiologis/delimg/').customPUT({
                image: '',
                imagename: '',
                imagetype: '',
            }, $scope.data._id).then(function () {
                $scope.progress = 0;
                $alert({
                    content: 'Gambar sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('radiologi');
        });

    });
