'use strict';

angular.module('kpmApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rekam', {
                url: '/rekam',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/home/home.html',
                        controller: 'RekamHomeCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Home'
                }
            })
            .state('rekam.daftar', {
                url: '/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/daftar/daftar.html',
                        controller: 'RekamDaftarCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Daftar Pasien'
                }
            })
            .state('rekam.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/create/create.html',
                        controller: 'RekamCreateCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Create Pasien'
                }
            })
            .state('rekam.daftar.options', {
                url: '/options/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/options/options.html',
                        controller: 'RekamOptionsCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: '{{nama}}'
                }
            })
            .state('rekam.daftar.options.profil', {
                url: '/profil',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/profil/profil.html',
                        controller: 'RekamProfilCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Profil'
                }
            })
            .state('rekam.daftar.options.anamnesa', {
                url: '/anamnesa',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/anamnesa/anamnesa.html',
                        controller: 'RekamAnamnesaCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Anamnesa'
                }
            })
            .state('rekam.daftar.options.fisikdiagnostik', {
                url: '/fisikdiagnostik',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/fisikdiagnostik/fisikdiagnostik.html',
                        controller: 'RekamFisikDiagnostikCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Fisik Diagnostik'
                }
            })
            .state('rekam.daftar.options.radiologi', {
                url: '/radiologi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/radiologi/radiologi.html',
                        controller: 'RekamRadiologiCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Pemeriksaan Radiologi'
                }
            })
            .state('rekam.daftar.options.laboratorium', {
                url: '/laboratorium',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/laboratorium/laboratorium.html',
                        controller: 'RekamLaboratoriumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Pemeriksaan Laboratorium'
                }
            });
    });
