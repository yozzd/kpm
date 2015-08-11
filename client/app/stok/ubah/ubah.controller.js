'use strict';

angular.module('kpmApp')
    .controller('StokUbahCtrl', function ($scope, User, Auth, $timeout, $state) {

        $scope.errors = {};
        $scope.user = {
            email: Auth.getCurrentUser().email
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.email, $scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.counter = 5;
                        $scope.onTimeout = function () {
                            $scope.counter--;
                            if ($scope.counter > 0) {
                                timeout = $timeout($scope.onTimeout, 1000);
                            } else {
                                Auth.logout();
                                $state.go('login');
                            }
                        };
                        var timeout = $timeout($scope.onTimeout, 1000);
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.password = 'Password salah';
                    });
            }
        };

    });
