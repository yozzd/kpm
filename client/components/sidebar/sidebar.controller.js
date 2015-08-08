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
                'link': 'rekam.laporan({lid: 1})',
            }, {
                'title': 'TB Paru BTA Negatif',
                'link': 'rekam.laporan({lid: 2})',
            }, {
                'title': 'TB Paru Anak (Tersangka) Kelenjar',
                'link': 'rekam.laporan({lid: 3})',
            }, {
                'title': 'TB Paru Anak (Tersangka) Gizi Buruk',
                'link': 'rekam.laporan({lid: 4})',
            }, {
                'title': 'TB Paru Anak (Tersangka) Kontak',
                'link': 'rekam.laporan({lid: 5})',
            }, {
                'title': 'TB Ekstra Paru',
                'link': 'rekam.laporan({lid: 6})',
            }, {
                'title': 'ISPA Non Pneumonia Non Bronkhitis',
                'link': 'rekam.laporan({lid: 7})',
            }, {
                'title': 'ISPA Non Pneumonia Bronkhitis',
                'link': 'rekam.laporan({lid: 8})',
            }, {
                'title': 'ISPA Pneumonia < 5 Tahun',
                'link': 'rekam.laporan({lid: 9})',
            }, {
                'title': 'ISPA Pneumonia > 5 Tahun',
                'link': 'rekam.laporan({lid: 10})',
            }, {
                'title': 'Abces Paru',
                'link': 'rekam.laporan({lid: 11})',
            }, {
                'title': 'Empyema',
                'link': 'rekam.laporan({lid: 12})',
            }, {
                'title': 'Atelektasis',
                'link': 'rekam.laporan({lid: 13})',
            }, {
                'title': 'Pneumothoraks',
                'link': 'rekam.laporan({lid: 14})',
            }, {
                'title': 'Hydropneumothoraks',
                'link': 'rekam.laporan({lid: 15})',
            }, {
                'title': 'Asma Bronkhial',
                'link': 'rekam.laporan({lid: 16})',
            }, {
                'title': 'PPOK (Bronkhitis Kronik / Emfisema)',
                'link': 'rekam.laporan({lid: 17})',
            }, {
                'title': 'Cor Pulmonak Chonicum (CPC)',
                'link': 'rekam.laporan({lid: 18})',
            }, {
                'title': 'Tumor Paru',
                'link': 'rekam.laporan({lid: 19})',
            }, {
                'title': 'Tumor Mediastinum',
                'link': 'rekam.laporan({lid: 20})',
            }, {
                'title': 'Tumor Pleura',
                'link': 'rekam.laporan({lid: 21})',
            }, {
                'title': 'Trauma Thoraks',
                'link': 'rekam.laporan({lid: 22})',
            }, {
                'title': 'Penyakit Vascular Paru',
                'link': 'rekam.laporan({lid: 23})',
            }, {
                'title': 'Post TB Paru',
                'link': 'rekam.laporan({lid: 24})',
            }, {
                'title': 'Penyakit Paru / Saluran Napas Lainnya',
                'link': 'rekam.laporan({lid: 25})',
            }, {
                'title': 'Penyakit Non Paru / Non Saluran Napas Lainnya',
                'link': 'rekam.laporan({lid: 26})',
            }]
        }, {
            chart: [{
                'title': 'Line Chart',
                'link': 'rekam.linechart',
            }]
        }, {
            setting: [{
                'title': 'Ubah password',
                'link': 'rekam.change',
            }]
        }];

    });
