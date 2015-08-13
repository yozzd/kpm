'use strict';

angular.module('kpmApp')
    .controller('RekamRadiologiCtrl', function ($scope, Restangular, $stateParams, socket, $alert, Upload, $modal) {

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
                type: contentType
            });
            return blob;
        }

        $scope.getData = function () {
            Restangular.one('radiologis').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.blobUrl = !$scope.data.image ? '' : URL.createObjectURL(b64toBlob($scope.data.image, $scope.data.contenttype));

                socket.syncUpdates('radiologi', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.progresszero = function () {
            $scope.progress = 0;
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.file !== null) {
                    Upload.upload({
                        url: '/api/radiologis/files/' + $scope.data._id,
                        file: $scope.file,
                        method: 'PUT',
                        fields: {
                            thorakpatgl: $scope.data.thorakpatgl,
                            thorakpahasil: $scope.data.thorakpahasil,
                            thorakcttgl: $scope.data.thorakcttgl,
                            thorakcthasil: $scope.data.thorakcthasil,
                            thorakusgtgl: $scope.data.thorakusgtgl,
                            thorakusghasil: $scope.data.thorakusghasil
                        },
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
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

        $scope.imgmodal = function (blobUrl) {
            var scope = $scope.$new();
            scope.data = {
                blobUrl: blobUrl
            };
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
                contenttype: ''
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
