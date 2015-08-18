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
                access: 'admin',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('admin.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/admin/create/create.html',
                        controller: 'AdminCreateCtrl'
                    }
                },
                authenticate: true,
                access: 'admin',
                ncyBreadcrumb: {
                    label: 'Create User'
                }
            });
    });
