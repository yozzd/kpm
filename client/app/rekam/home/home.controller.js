'use strict';

angular.module('kpmApp')
    .controller('RekamHomeCtrl', function ($scope) {

        $scope.menus1 = [{
            'title': 'Daftar Pasien',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.daftar'
        }, {
            'title': 'Create Pasien',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-user-plus fa-4x fa-fw',
            'link': 'rekam.create'
        }];

        $scope.menus2 = [{
            'title': 'TB Paru BTA Positif',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 1})'
        }, {
            'title': 'TB Paru BTA Negatif',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 2})'
        }, {
            'title': 'TB Paru Anak (Tersangka) Kelenjar',
            'class': 'animation fadeInRight speed-1500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 3})'
        }, {
            'title': 'TB Paru Anak (Tersangka) Gizi Buruk',
            'class': 'animation fadeInRight speed-2000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 4})'
        }, {
            'title': 'TB Paru Anak (Tersangka) Kontak',
            'class': 'animation fadeInRight speed-2500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 5})'
        }, {
            'title': 'TB Ekstra Paru',
            'class': 'animation fadeInRight speed-3000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 6})'
        }, {
            'title': 'ISPA Non Pneumonia Non Bronkhitis',
            'class': 'animation fadeInRight speed-3500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 7})'
        }, {
            'title': 'ISPA Non Pneumonia Bronkhitis',
            'class': 'animation fadeInRight speed-4000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 8})'
        }];

        $scope.menus3 = [{
            'title': 'ISPA Pneumonia < 5 Tahun',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 9})'
        }, {
            'title': 'ISPA Pneumonia > 5 Tahun',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 10})'
        }, {
            'title': 'Abces Paru',
            'class': 'animation fadeInRight speed-1500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 11})'
        }, {
            'title': 'Empyema',
            'class': 'animation fadeInRight speed-2000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 12})'
        }, {
            'title': 'Atelektasis',
            'class': 'animation fadeInRight speed-2500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 13})'
        }, {
            'title': 'Pneumothoraks',
            'class': 'animation fadeInRight speed-3000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 14})'
        }, {
            'title': 'Hydropneumo- thoraks',
            'class': 'animation fadeInRight speed-3500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 15})'
        }, {
            'title': 'Asma Bronkhial',
            'class': 'animation fadeInRight speed-4000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 16})'
        }];

        $scope.menus4 = [{
            'title': 'PPOK (Bronkhitis Kronik / Emfisema)',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 17})'
        }, {
            'title': 'Cor Pulmonak Chonicum (CPC)',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 18})'
        }, {
            'title': 'Tumor Paru',
            'class': 'animation fadeInRight speed-1500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 19})'
        }, {
            'title': 'Tumor Mediastinum',
            'class': 'animation fadeInRight speed-2000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 20})'
        }, {
            'title': 'Tumor Pleura',
            'class': 'animation fadeInRight speed-2500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 21})'
        }, {
            'title': 'Trauma Thoraks',
            'class': 'animation fadeInRight speed-3000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 22})'
        }, {
            'title': 'Penyakit Vascular Paru',
            'class': 'animation fadeInRight speed-3500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 23})'
        }, {
            'title': 'Post TB Paru',
            'class': 'animation fadeInRight speed-4000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 24})'
        }];

        $scope.menus5 = [{
            'title': 'Penyakit Paru / Saluran Napas Lainnya',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 25})'
        }, {
            'title': 'Penyakit Non Paru / Non Saluran Napas Lainnya',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-list-ol fa-4x fa-fw',
            'link': 'rekam.laporan({lid: 26})'
        }];

        $scope.menus6 = [{
            'title': 'Line Chart',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-line-chart fa-4x fa-fw',
            'link': 'rekam.linechart'
        }, {
            'title': 'Bar Chart',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-bar-chart fa-4x fa-fw',
            'link': 'rekam.barchart'
        }, {
            'title': 'Pie Chart',
            'class': 'animation fadeInRight speed-1500',
            'icon': 'fa fa-pie-chart fa-4x fa-fw',
            'link': 'rekam.piechart'
        }];

        $scope.menus7 = [{
            'title': 'Ubah Password',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-unlock-alt fa-4x fa-fw',
            'link': 'rekam.ubah'
        }];

    });
