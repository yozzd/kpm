'use strict';

angular.module('kpmApp')
    .controller('NavbarCtrl', function ($scope, $state, Auth) {

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.isOprRekam = Auth.isOprRekam;
        $scope.isOprStok = Auth.isOprStok;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $state.go('login');
        };

    });