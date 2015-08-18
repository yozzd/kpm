'use strict';

angular.module('kpmApp')
    .controller('AdminCreateCtrl', function ($scope, Auth, $alert) {

        $scope.user = {};
        $scope.errors = {};

        $scope.roles = [{
            str: 'Operator Rekam Medik',
            val: 'oprrekam',
            path: 'rekam'
        }, {
            str: 'Operator Stok Obat',
            val: 'oprstok',
            path: 'stok'
        }];
        $scope.role = {};

        $scope.submit = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                        email: $scope.user.email,
                        name: $scope.user.email,
                        password: $scope.user.password,
                        role: $scope.role.selected.val,
                        path: $scope.role.selected.path
                    })
                    .then(function () {
                        $alert({
                            content: 'User berhasil dibuat',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors = {};
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };

    });
