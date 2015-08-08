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

        $scope.popup = function (id) {
            var left = screen.width / 2 - 400;
            var top = screen.height / 2 - 250;
            var url = '/api/pasiens/cetak/' + id;
            window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
        };

        $scope.getData();

    });
