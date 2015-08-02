'use strict';

angular.module('kpmApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'mgcrea.ngStrap',
    'ngAnimate',
    'restangular',
    'ncy-angular-breadcrumb',
    'angularMoment',
    'ui.select',
    'ui.grid',
    'ui.grid.pinning',
    'ui.grid.resizeColumns',
    'ngFileUpload'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, $compileProvider) {
        $urlRouterProvider
            .otherwise('/login');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');

        //Restangular config
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setDefaultHttpFields({
            cache: false
        });
        RestangularProvider.setRequestInterceptor(function (elem, operation) {
            if (operation === 'remove') {
                return undefined;
            }
            return elem;
        });
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|data):/);
    })

.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
        // Add authorization token to headers
        request: function (config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function ($rootScope, $location, Auth, amMoment) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function (loggedIn) {
            if (next.authenticate && !loggedIn) {
                $location.path('/login');
            } else if (!Auth.isAuthorized(next.access)) {
                $location.path('/403');
            }
        });
    });
    amMoment.changeLocale('id');
});
