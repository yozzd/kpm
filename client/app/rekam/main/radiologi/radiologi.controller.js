'use strict';

angular.module('kpmApp')
    .controller('RekamRadiologiCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('radiologis').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                socket.syncUpdates('radiologi', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('radiologi');
        });

    });
