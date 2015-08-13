'use strict';

angular.module('kpmApp')
    .controller('StokDetailBpjsCtrl', function ($scope, Restangular, $stateParams) {

        $scope.getData = function () {
            Restangular.one('reseps').customGET($stateParams.id + '/' + $stateParams.lid).then(function (data) {
                $scope.data = data[0];
            });
        };

        $scope.getData();

    });
