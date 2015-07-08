'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('stok', {
                url: '/stok',
                views: {
                    '@': {
                        templateUrl: 'app/stok/home/home.html',
                        controller: 'StokHomeCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok'
            });
    });