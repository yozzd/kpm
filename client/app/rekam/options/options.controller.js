'use strict';

angular.module('kpmApp')
    .controller('RekamOptionsCtrl', function ($scope, Restangular, $stateParams, socket) {

        $scope.getData = function () {
            Restangular.one('pasiens').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data.nama;
                socket.syncUpdates('pasien', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

    });
