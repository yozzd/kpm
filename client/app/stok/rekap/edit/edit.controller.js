'use strict';

angular.module('kpmApp')
    .controller('StokEditRekapCtrl', function ($scope, Restangular, socket, $alert, $stateParams) {

        $scope.getData = function () {
            Restangular.one('obats').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                console.log($scope.data);
            });
        };

        $scope.getData();

    });
