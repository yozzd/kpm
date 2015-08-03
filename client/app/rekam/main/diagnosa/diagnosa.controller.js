'use strict';

angular.module('kpmApp')
    .controller('RekamDiagnosaCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('diagnosas').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.primer.selected = {
                    opsi: $scope.data.primer
                };
                for (var i = 0; i < $scope.data.sekunder.length; i++) {
                    $scope.sekunder.selected.push({
                        opsi: $scope.data.sekunder[i].opsi
                    });
                }

                socket.syncUpdates('diagnosa', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getOpsi = function () {
            Restangular.all('opsidiagnosas').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        };

        $scope.getData();
        $scope.getOpsi();

        $scope.primer = {};
        $scope.sekunder = {};
        $scope.sekunder.selected = [];

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('diagnosas').customPUT({
                    primer: $scope.primer.selected.opsi,
                    keterangan: $scope.data.keterangan,
                    sekunder: $scope.sekunder.selected
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
            socket.unsyncUpdates('diagnosa');
        });
    });
