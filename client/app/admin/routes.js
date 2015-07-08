'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '@': {
                        templateUrl: 'app/admin/home/home.html',
                        controller: 'AdminHomeCtrl'
                    }
                },
                authenticate: true,
                access: 'admin'
            });
    });