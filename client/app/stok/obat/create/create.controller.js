'use strict';

angular.module('kpmApp')
    .controller('StokCreateObatCtrl', function ($scope, Restangular, $alert) {

        $scope.satuan = {};
        $scope.satuans = ['Kapsul', 'Sirup', 'Tablet'];

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('obats').customPOST({
                    nama: $scope.data.nama,
                    satuan: $scope.satuan.selected
                }).then(function (data) {
                    if (!data.error) {
                        $alert({
                            content: 'Data sukses disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    } else {
                        $alert({
                            title: 'Error!',
                            content: data.error,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    }
                });
            }
        };
    });
