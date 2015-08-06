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
            })
            .state('rekam.tbpositif', {
                url: '/tbpositif',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tbpositif/tbpositif.html',
                        controller: 'RekamTbPositifCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'TB Paru BTA Positif'
                }
            })
            .state('rekam.tbnegatif', {
                url: '/tbnegatif',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tbnegatif/tbnegatif.html',
                        controller: 'RekamTbNegatifCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'TB Paru BTA Negatif'
                }
            })
            .state('rekam.tbanakkelenjar', {
                url: '/tbanakkelenjar',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tbanakkelenjar/tbanakkelenjar.html',
                        controller: 'RekamTbAnakKelenjarCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'TB Paru Anak (Tersangka) Kelenjar'
                }
            })
            .state('rekam.tbanakgiziburuk', {
                url: '/tbanakgiziburuk',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tbanakgiziburuk/tbanakgiziburuk.html',
                        controller: 'RekamTbAnakGiziBurukCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'TB Paru Anak (Tersangka) Gizi Buruk'
                }
            })
            .state('rekam.tbanakkontak', {
                url: '/tbanakkontak',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tbanakkontak/tbanakkontak.html',
                        controller: 'RekamTbAnakKontakCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'TB Paru Anak (Tersangka) Kontak'
                }
            })
            .state('rekam.tbekstra', {
                url: '/tbekstra',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tbekstra/tbekstra.html',
                        controller: 'RekamTbEkstraCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'TB Ekstra Paru'
                }
            })
            .state('rekam.nonbronkhitis', {
                url: '/nonbronkhitis',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/nonbronkhitis/nonbronkhitis.html',
                        controller: 'RekamNonBronkhitisCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'ISPA Non Pneumonia Non Bronkhitis'
                }
            })
            .state('rekam.bronkhitis', {
                url: '/bronkhitis',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/bronkhitis/bronkhitis.html',
                        controller: 'RekamBronkhitisCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'ISPA Non Pneumonia Bronkhitis'
                }
            })
            .state('rekam.pneumonia5kd', {
                url: '/pneumonia5kd',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/pneumonia5kd/pneumonia5kd.html',
                        controller: 'RekamPneumonia5kdCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'ISPA Pneumonia < 5 Tahun'
                }
            })
            .state('rekam.pneumonia5bd', {
                url: '/pneumonia5bd',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/pneumonia5bd/pneumonia5bd.html',
                        controller: 'RekamPneumonia5bdCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'ISPA Pneumonia > 5 Tahun'
                }
            })
            .state('rekam.abcesparu', {
                url: '/abcesparu',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/abcesparu/abcesparu.html',
                        controller: 'RekamAbcesParuCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Abces Paru'
                }
            })
            .state('rekam.empyema', {
                url: '/empyema',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/empyema/empyema.html',
                        controller: 'RekamEmpyemaCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Empyema'
                }
            })
            .state('rekam.atelektasis', {
                url: '/atelektasis',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/atelektasis/atelektasis.html',
                        controller: 'RekamAtelektasisCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Atelektasis'
                }
            })
            .state('rekam.pneumothoraks', {
                url: '/pneumothoraks',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/pneumothoraks/pneumothoraks.html',
                        controller: 'RekamPneumothoraksCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Pneumothoraks'
                }
            })
            .state('rekam.hydropneumothoraks', {
                url: '/hydropneumothoraks',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/hydropneumothoraks/hydropneumothoraks.html',
                        controller: 'RekamHydropneumothoraksCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Hydropneumothoraks'
                }
            })
            .state('rekam.asmabronkhial', {
                url: '/asmabronkhial',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/asmabronkhial/asmabronkhial.html',
                        controller: 'RekamAsmaBronkhialCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Asma Bronkhial'
                }
            })
            .state('rekam.ppok', {
                url: '/ppok',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/ppok/ppok.html',
                        controller: 'RekamPpokCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'PPOK (Bronkhitis Kronik / Emfisema)'
                }
            })
            .state('rekam.cpc', {
                url: '/cpc',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/cpc/cpc.html',
                        controller: 'RekamCpcCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Cor Pulmonak Chonicum (CPC)'
                }
            })
            .state('rekam.tumorparu', {
                url: '/tumorparu',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tumorparu/tumorparu.html',
                        controller: 'RekamTumorParuCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Tumor Paru'
                }
            })
            .state('rekam.tumormediastinum', {
                url: '/tumormediastinum',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tumormediastinum/tumormediastinum.html',
                        controller: 'RekamTumorMediastinumCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Tumor Mediastinum'
                }
            })
            .state('rekam.tumorpleura', {
                url: '/tumorpleura',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/tumorpleura/tumorpleura.html',
                        controller: 'RekamTumorPleuraCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Tumor Pleura'
                }
            })
            .state('rekam.traumathoraks', {
                url: '/traumathoraks',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/traumathoraks/traumathoraks.html',
                        controller: 'RekamTraumaThoraksCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Trauma Thoraks'
                }
            })
            .state('rekam.vascularparu', {
                url: '/vascularparu',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/vascularparu/vascularparu.html',
                        controller: 'RekamVascularParuCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Penyakit Vascular Paru'
                }
            })
            .state('rekam.posttbparu', {
                url: '/posttbparu',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/posttbparu/posttbparu.html',
                        controller: 'RekamPostTbParuCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Post TB Paru'
                }
            })
            .state('rekam.penyakitparu', {
                url: '/penyakitparu',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/penyakitparu/penyakitparu.html',
                        controller: 'RekamPenyakitParuCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Penyakit Paru / Saluran Napas Lainnya'
                }
            })
            .state('rekam.penyakitnonparu', {
                url: '/penyakitnonparu',
                views: {
                    '@': {
                        templateUrl: 'app/rekam/laporan/penyakitnonparu/penyakitnonparu.html',
                        controller: 'RekamPenyakitNonParuCtrl'
                    }
                },
                authenticate: true,
                access: 'oprrekam',
                ncyBreadcrumb: {
                    label: 'Penyakit Non Paru / Non Saluran Napas Lainnya'
                }
            });
    });
