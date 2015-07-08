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
                'link': 'rekam.parupositif',
            }, {
                'title': 'TB Paru BTA Negatif',
                'link': 'rekam.parunegatif',
            }, {
                'title': 'TB (Paru Anak) Kelenjar',
                'link': 'rekam.kelenjar',
            }, {
                'title': 'TB (Paru Anak) Gizi Buruk',
                'link': 'rekam.giziburuk',
            }, {
                'title': 'TB (Paru Anak) Kontak',
                'link': 'rekam.kontak',
            }, {
                'title': 'TB Ekstra Paru',
                'link': 'rekam.paruekstra',
            }, {
                'title': 'ISPA Non Pneumonia',
                'link': 'rekam.nonpneumonia',
            }, {
                'title': 'ISPA Pneumonia',
                'link': 'rekam.pneumonia',
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
                'link': 'rekam.postparu',
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
