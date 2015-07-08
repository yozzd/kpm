'use strict';

angular.module('kpmApp')
    .controller('LoginCtrl', function ($scope, Auth, $state) {

        $scope.year1 = parseInt(2015);
        $scope.year2 = new Date().getFullYear();

        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function () {
                        $state.go(Auth.getCurrentUser().path);
                    })
                    .catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

    });
