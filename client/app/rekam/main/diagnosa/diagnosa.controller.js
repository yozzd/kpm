'use strict';

angular.module('kpmApp')
    .controller('RekamDiagnosaCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('diagnosas').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                socket.syncUpdates('diagnosa', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('diagnosa');
        });
    });
