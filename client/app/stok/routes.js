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
            .state('stok.daftarrekap', {
                url: '/rekap/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/stok/rekap/daftar/daftar.html',
                        controller: 'StokDaftarRekapCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Rekap BPJS & Umum'
                }
            })
            .state('stok.daftarrekap.edit', {
                url: '/edit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/stok/rekap/edit/edit.html',
                        controller: 'StokEditRekapCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Edit Rekap'
                }
            })
            .state('stok.rekapbpjs', {
                url: '/rekap/bpjs',
                views: {
                    '@': {
                        templateUrl: 'app/stok/rekap/bpjs/bpjs.html',
                        controller: 'StokRekapBpjsCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Rekap BPJS'
                }
            })
            .state('stok.rekapumum', {
                url: '/rekap/umum',
                views: {
                    '@': {
                        templateUrl: 'app/stok/rekap/umum/umum.html',
                        controller: 'StokRekapUmumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Rekap Umum'
                }
            })
            .state('stok.resepbpjs', {
                url: '/resep/bpjs/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/bpjs/daftar/daftar.html',
                        controller: 'StokDaftarBpjsCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Daftar Resep BPJS'
                }
            })
            .state('stok.createresepbpjs', {
                url: '/resep/bpjs/create',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/bpjs/create/create.html',
                        controller: 'StokCreateBpjsCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Create Resep BPJS'
                }
            })
            .state('stok.resepbpjs.detail', {
                url: '/detail/{id}/{lid}',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/bpjs/detail/detail.html',
                        controller: 'StokDetailBpjsCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Detail Resep BPJS'
                }
            })
            .state('stok.resepbpjs.edit', {
                url: '/edit/{id}/{lid}',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/bpjs/edit/edit.html',
                        controller: 'StokEditBpjsCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Edit Resep BPJS'
                }
            })
            .state('stok.resepumum', {
                url: '/resep/umum/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/umum/daftar/daftar.html',
                        controller: 'StokDaftarUmumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Daftar Resep Umum'
                }
            })
            .state('stok.createresepumum', {
                url: '/resep/umum/create',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/umum/create/create.html',
                        controller: 'StokCreateUmumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Create Resep Umum'
                }
            })
            .state('stok.resepumum.detail', {
                url: '/detail/{id}/{lid}',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/umum/detail/detail.html',
                        controller: 'StokDetailUmumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Detail Resep Umum'
                }
            })
            .state('stok.resepumum.edit', {
                url: '/edit/{id}/{lid}',
                views: {
                    '@': {
                        templateUrl: 'app/stok/resep/umum/edit/edit.html',
                        controller: 'StokEditUmumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprstok',
                ncyBreadcrumb: {
                    label: 'Edit Resep Umum'
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
