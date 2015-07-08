'use strict';

angular.module('kpmApp')
    .controller('403Ctrl', function ($scope, Auth) {

        $scope.getCurrentUser = Auth.getCurrentUser;

    });