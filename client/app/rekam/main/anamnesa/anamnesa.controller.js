'use strict';

angular.module('kpmApp')
    .controller('RekamAnamnesaCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('anamnesas').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;
                $scope.batuk.selected = data.batuk;
                socket.syncUpdates('anamnesa', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.batuk = {};
        $scope.enums = ['...', 'Ya', 'Tidak'];

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('anamnesas').customPUT({
                    batuk: $scope.batuk.selected
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
            socket.unsyncUpdates('anamnesa');
        });

    });
