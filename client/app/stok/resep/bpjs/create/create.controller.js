'use strict';

angular.module('kpmApp')
    .controller('StokCreateBpjsCtrl', function ($scope, Restangular, $alert) {

        $scope.getPasien = function () {
            Restangular.all('pasiens').customGETLIST().then(function (datas) {
                $scope.filter = _.filter(datas, function (value) {
                    return value.pembiayaan === 'BPJS';
                });
                $scope.pasiens = $scope.filter;
            });
        };

        $scope.getPasien();
        $scope.pasien = {};

        $scope.pick = function (x) {
            $scope.umur = x.umur + ' ' + x.satuanumur;
            $scope.jeniskelamin = x.jeniskelamin;
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('reseps').customPUT({
                    tanggal: $scope.data.tanggal,
                    pasien: $scope.pasien.selected
                }, $scope.pasien.selected._id).then(function () {
                    $alert({
                        content: 'Data sukses disimpan',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };
    });
