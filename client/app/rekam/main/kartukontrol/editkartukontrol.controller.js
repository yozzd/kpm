'use strict';

angular.module('kpmApp')
    .controller('RekamEditKartuKontrolCtrl', function ($scope, Restangular, $stateParams, socket, $alert, Upload, $state, $modal) {

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
            Restangular.one('kartukontrols').customGET($stateParams.id).then(function (data) {
                $scope.id = data._id;
                $scope.nama = data._pasien.nama;
                var find = _.find(data.kontrol, function (chr) {
                    return chr._id === $stateParams.kid;
                });
                $scope.data = find;

                $scope.blobUrl = !$scope.data.image ? '' : URL.createObjectURL(b64toBlob($scope.data.image, $scope.data.contenttype));

                Restangular.all('opsidiagnosas').customGETLIST().then(function (datas) {
                    $scope.datas = datas;
                    var opsi = _.find(datas, function (chr) {
                        return chr.opsi === find.diagnosa;
                    });

                    $scope.diagnosa.selected = opsi;
                });
            });
        };

        $scope.getOpsi = function () {
            Restangular.all('opsidiagnosas').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        };

        $scope.getData();
        $scope.getOpsi();

        $scope.diagnosa = {};

        $scope.progresszero = function () {
            $scope.progress = 0;
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.file !== null) {
                    Upload.upload({
                        url: '/api/kartukontrols/' + $scope.id,
                        file: $scope.file,
                        method: 'PUT',
                        fields: {
                            id: $stateParams.kid,
                            tanggal: $scope.data.tanggal,
                            keluhan: $scope.data.keluhan,
                            lab: $scope.data.lab,
                            sputum: $scope.data.sputum,
                            mt: $scope.data.mt,
                            berat: $scope.data.berat,
                            tinggi: $scope.data.tinggi,
                            did: $scope.diagnosa.selected.oid,
                            diagnosa: $scope.diagnosa.selected.opsi,
                            terapi: $scope.data.terapi
                        },
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
                        $alert({
                            content: 'Data sukses diupdate',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                        $state.go('rekam.daftar.options.kartukontrol');
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
                template: 'app/rekam/main/kartukontrol/template.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            imgmodal.$promise.then(imgmodal.show);
        };

    });
