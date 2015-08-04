'use strict';

angular.module('kpmApp')
    .controller('RekamAddKartuKontrolCtrl', function ($scope, Restangular, $stateParams, socket, $alert, Upload, $state) {

        $scope.getData = function () {
            Restangular.one('kartukontrols').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;
            });
        };
        console.log($stateParams.id);

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
                        url: '/api/kartukontrols/files/' + $scope.data._id,
                        file: $scope.file,
                        method: 'POST',
                        fields: {
                            tanggal: $scope.data.tanggal,
                            keluhan: $scope.data.keluhan,
                            lab: $scope.data.lab,
                            sputum: $scope.data.sputum,
                            mt: $scope.data.mt,
                            berat: $scope.data.berat,
                            tinggi: $scope.data.tinggi,
                            diagnosa: $scope.diagnosa.selected.opsi,
                            terapi: $scope.data.terapi
                        },
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
                        $alert({
                            content: 'Data sukses ditambah',
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

    });
