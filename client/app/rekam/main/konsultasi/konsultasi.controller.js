'use strict';

angular.module('kpmApp')
    .controller('RekamKonsultasiCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('konsultasis').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.konsul.pick = !$scope.data.konsul ? '' : $scope.data.konsul;

                socket.syncUpdates('konsultasi', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Kesehatan Paru', 'Gizi', 'Berhenti Merokok'];

        $scope.konsul = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('konsultasis').customPUT({
                    konsul: $scope.konsul.pick
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
            socket.unsyncUpdates('konsultasi');
        });
    });
