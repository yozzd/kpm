'use strict';

angular.module('kpmApp')
    .controller('RekamTerapiCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('terapis').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.punctie.selected = $scope.data.punctie;

                socket.syncUpdates('terapi', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Percobaan', 'Aspirasi'];

        $scope.punctie = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('terapis').customPUT({
                    nebulizer: $scope.data.nebulizer,
                    punctie: $scope.punctie.selected,
                    subpunctie: $scope.data.subpunctie,
                    wsd: $scope.data.wsd,
                    pleurodesis: $scope.data.pleurodesis
                }, $scope.data._id).then(function () {
                    $alert({
                        content: 'Data sukses diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('terapi');
        });
    });
