'use strict';

angular.module('kpmApp')
    .controller('RekamPengobatanCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('pengobatans').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.tb.selected = $scope.data.tb === '' ? null : $scope.data.tb;

                socket.syncUpdates('pengobatan', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['I', 'II', 'III'];

        $scope.tb = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('pengobatans').customPUT({
                    tb: $scope.tb.selected,
                    tba: $scope.data.tba,
                    tbb: $scope.data.tbb,
                    tbc: $scope.data.tbc,
                    tbd: $scope.data.tbd,
                    nontba: $scope.data.nontba,
                    nontbb: $scope.data.nontbb,
                    nontbc: $scope.data.nontbc,
                    nontbd: $scope.data.nontbd
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
            socket.unsyncUpdates('pengobatan');
        });
    });
