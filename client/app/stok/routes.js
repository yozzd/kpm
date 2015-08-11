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
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('stok.daftarobat', {
                url: '/obat/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/stok/obat/daftar/daftar.html',
                        controller: 'StokDaftarObatCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Daftar Obat'
                }
            })
            .state('stok.createobat', {
                url: '/obat/create',
                views: {
                    '@': {
                        templateUrl: 'app/stok/obat/create/create.html',
                        controller: 'StokCreateObatCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Create Obat'
                }
            })
            .state('stok.ubah', {
                url: '/ubah',
                views: {
                    '@': {
                        templateUrl: 'app/stok/ubah/ubah.html',
                        controller: 'StokUbahCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Ubah Password'
                }
            });
    });
