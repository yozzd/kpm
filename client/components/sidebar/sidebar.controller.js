'use strict';

angular.module('kpmApp')
    .controller('SidebarCtrl', function ($scope) {

        $scope.rekam = [{
            home: [{
                'title': 'Home',
                'link': 'rekam'
            }]
        }, {
            pasien: [{
                'title': 'Daftar Pasien',
                'link': 'rekam.daftar',
            }, {
                'title': 'Create Pasien',
                'link': 'rekam.create',
            }]
        }, {
            laporan: [{
                'title': 'TB Paru BTA Positif',
                'link': 'rekam.tbpositif',
            }, {
                'title': 'TB Paru BTA Negatif',
                'link': 'rekam.tbnegatif',
            }, {
                'title': 'TB Paru Anak (Tersangka) Kelenjar',
                'link': 'rekam.tbanakkelenjar',
            }, {
                'title': 'TB Paru Anak (Tersangka) Gizi Buruk',
                'link': 'rekam.tbanakgiziburuk',
            }, {
                'title': 'TB Paru Anak (Tersangka) Kontak',
                'link': 'rekam.tbanakkontak',
            }, {
                'title': 'TB Ekstra Paru',
                'link': 'rekam.tbekstra',
            }, {
                'title': 'ISPA Non Pneumonia Non Bronkhitis',
                'link': 'rekam.nonbronkhitis',
            }, {
                'title': 'ISPA Non Pneumonia Bronkhitis',
                'link': 'rekam.bronkhitis',
            }, {
                'title': 'ISPA Pneumonia < 5 Tahun',
                'link': 'rekam.pneumonia5kd',
            }, {
                'title': 'ISPA Pneumonia > 5 Tahun',
                'link': 'rekam.pneumonia5bd',
            }, {
                'title': 'Abces Paru',
                'link': 'rekam.abcesparu',
            }, {
                'title': 'Empyema',
                'link': 'rekam.empyema',
            }, {
                'title': 'Atelektasis',
                'link': 'rekam.atelektasis',
            }, {
                'title': 'Pneumothoraks',
                'link': 'rekam.pneumothoraks',
            }, {
                'title': 'Hydropneumothoraks',
                'link': 'rekam.hydropneumothoraks',
            }, {
                'title': 'Asma Bronkhial',
                'link': 'rekam.asmabronkhial',
            }, {
                'title': 'PPOK (Bronkhitis Kronik / Emfisema)',
                'link': 'rekam.ppok',
            }, {
                'title': 'Cor Pulmonak Chonicum (CPC)',
                'link': 'rekam.cpc',
            }, {
                'title': 'Tumor Paru',
                'link': 'rekam.tumorparu',
            }, {
                'title': 'Tumor Mediastinum',
                'link': 'rekam.tumormediastinum',
            }, {
                'title': 'Tumor Pleura',
                'link': 'rekam.tumorpleura',
            }, {
                'title': 'Trauma Thoraks',
                'link': 'rekam.traumathoraks',
            }, {
                'title': 'Penyakit Vascular Paru',
                'link': 'rekam.vascularparu',
            }, {
                'title': 'Post TB Paru',
                'link': 'rekam.posttbparu',
            }, {
                'title': 'Penyakit Paru / Saluran Napas Lainnya',
                'link': 'rekam.penyakitparu',
            }, {
                'title': 'Penyakit Non Paru / Non Saluran Napas Lainnya',
                'link': 'rekam.penyakitnonparu',
            }]
        }, {
            setting: [{
                'title': 'Ubah password',
                'link': 'rekam.change',
            }]
        }];

    });
