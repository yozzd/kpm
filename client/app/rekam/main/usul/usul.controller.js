'use strict';

angular.module('kpmApp')
    .controller('RekamUsulCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('usuls').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                socket.syncUpdates('usul', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('usuls/add').customPUT($scope.value, $scope.data._id).then(function () {
                    $alert({
                        content: 'Data sukses diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.update = function (id, usulan) {
            Restangular.one('usuls').customPUT({
                id: id,
                usulan: usulan
            }, $scope.data._id).then(function () {
                $alert({
                    content: 'Data sukses diupdate',
                    placement: 'top-right',
                    type: 'info',
                    duration: 5
                });
            });
        };

        $scope.rem = function (id) {
            Restangular.one('usuls/rem').customPUT({
                id: id
            }, $scope.data._id).then(function () {
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('usul');
        });

    });
