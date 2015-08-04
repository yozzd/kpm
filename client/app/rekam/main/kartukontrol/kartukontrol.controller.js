'use strict';

angular.module('kpmApp')
    .controller('RekamKartuKontrolCtrl', function ($scope, Restangular, $stateParams, socket, $modal, uiGridConstants) {

        $scope.getData = function () {
            Restangular.one('kartukontrols').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                socket.syncUpdates('kartukontrol', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.imgmodal = function (image) {
            var scope = $scope.$new();
            scope.data = {
                image: image
            };
            var imgmodal = $modal({
                scope: scope,
                template: 'app/rekam/main/kartukontrol/template.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            imgmodal.$promise.then(imgmodal.show);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('kartukontrol');
        });

    });
