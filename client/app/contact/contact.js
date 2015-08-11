'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact',
                views: {
                    '@': {
                        templateUrl: 'app/contact/contact.html',
                        controller: 'ContactCtrl'
                    }
                }
            });
    });
