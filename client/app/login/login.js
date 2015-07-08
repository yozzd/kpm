'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    '@': {
                        templateUrl: 'app/login/login.html',
                        controller: 'LoginCtrl'
                    }
                },
                authenticate: true
            });
    });