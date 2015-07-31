'use strict';

angular.module('kpmApp')
    .controller('RekamRehabilitasiCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('rehabilitasis').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.rehab.pick = !$scope.data.rehab ? '' : $scope.data.rehab;

                socket.syncUpdates('rehabilitasi', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Postural Drainage', 'Latihan Pernapasan Sederhana', 'Latihan Pernapasan Khusus', 'Terapi Oksigen'];

        $scope.rehab = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('rehabilitasis').customPUT({
                    rehab: $scope.rehab.pick
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
            socket.unsyncUpdates('rehabilitasi');
        });
    });
