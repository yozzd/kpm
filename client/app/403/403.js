'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('403', {
                url: '/403',
                views: {
                    '@': {
                        templateUrl: 'app/403/403.html',
                        controller: '403Ctrl'
                    }
                }
            });
    });