'use strict';

angular.module('kpmApp')
    .controller('StokDaftarObatCtrl', function ($scope, Restangular, $alert) {

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        };

        $scope.getObat();

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

    });
