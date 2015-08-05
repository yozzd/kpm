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
            })
            .state('rekam.daftar.options.medisdiagnostik', {
                url: '/medisdiagnostik',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/medisdiagnostik/medisdiagnostik.html',
                        controller: 'RekamMedisDiagnostikCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Pemeriksaan / Tindakan Medis Diagnostik'
                }
            })
            .state('rekam.daftar.options.diagnosa', {
                url: '/diagnosa',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/diagnosa/diagnosa.html',
                        controller: 'RekamDiagnosaCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Diagnosa'
                }
            })
            .state('rekam.daftar.options.pengobatan', {
                url: '/pengobatan',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/pengobatan/pengobatan.html',
                        controller: 'RekamPengobatanCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Pengobatan'
                }
            })
            .state('rekam.daftar.options.terapi', {
                url: '/terapi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/terapi/terapi.html',
                        controller: 'RekamTerapiCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Tindakan Medik Terapi'
                }
            })
            .state('rekam.daftar.options.rehabilitasi', {
                url: '/rehabilitasi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/rehabilitasi/rehabilitasi.html',
                        controller: 'RekamRehabilitasiCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Rehabilitasi Medik'
                }
            })
            .state('rekam.daftar.options.konsultasi', {
                url: '/konsultasi',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/konsultasi/konsultasi.html',
                        controller: 'RekamKonsultasiCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Konsultasi Khusus'
                }
            })
            .state('rekam.daftar.options.usul', {
                url: '/usul',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/usul/usul.html',
                        controller: 'RekamUsulCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Usul / Tindakan Lanjut'
                }
            })
            .state('rekam.daftar.options.kartukontrol', {
                url: '/kartukontrol',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/kartukontrol/kartukontrol.html',
                        controller: 'RekamKartuKontrolCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Kartu Kontrol'
                }
            })
            .state('rekam.daftar.options.kartukontrol.add', {
                url: '/add',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/kartukontrol/addkartukontrol.html',
                        controller: 'RekamAddKartuKontrolCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Add'
                }
            })
            .state('rekam.daftar.options.kartukontrol.edit', {
                url: '/{kid}/edit',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/main/kartukontrol/editkartukontrol.html',
                        controller: 'RekamEditKartuKontrolCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Edit'
                }
            });
    });
