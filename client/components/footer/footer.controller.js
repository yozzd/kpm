'use strict';

angular.module('kpmApp')
    .controller('FooterCtrl', function ($scope) {

        var d = new Date();
        $scope.year1 = parseInt(2015);
        $scope.year2 = d.getFullYear();

        $scope.link = 'contact';

    });
