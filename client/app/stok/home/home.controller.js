'use strict';

angular.module('kpmApp')
    .controller('StokHomeCtrl', function ($scope) {

        $scope.menus1 = [{
            'title': 'Daftar Obat',
            'link': 'stok.daftarobat',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw'
        }, {
            'title': 'Create Obat',
            'link': 'stok.createobat',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-pencil-square-o fa-4x fa-fw'
        }];

        $scope.menus2 = [{
            'title': 'Rekap BPJS & Umum',
            'link': 'stok.daftarrekap',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-tasks fa-4x fa-fw'
        }, {
            'title': 'Rekap BPJS',
            'link': 'stok.rekapbpjs',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-tasks fa-4x fa-fw'
        }, {
            'title': 'Rekap Umum',
            'link': 'stok.rekapumum',
            'class': 'animation fadeInRight speed-1500',
            'icon': 'fa fa-tasks fa-4x fa-fw'
        }];

        $scope.menus3 = [{
            'title': 'Daftar Resep BPJS',
            'link': 'stok.resepbpjs',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw'
        }, {
            'title': 'Create Resep BPJS',
            'link': 'stok.createresepbpjs',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-pencil-square-o fa-4x fa-fw'
        }];

        $scope.menus4 = [{
            'title': 'Daftar Resep Umum',
            'link': 'stok.resepumum',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-list-ol fa-4x fa-fw'
        }, {
            'title': 'Create Resep Umum',
            'link': 'stok.createresepumum',
            'class': 'animation fadeInRight speed-1000',
            'icon': 'fa fa-pencil-square-o fa-4x fa-fw'
        }];

        $scope.menus5 = [{
            'title': 'Ubah password',
            'link': 'stok.ubah',
            'class': 'animation fadeInRight speed-500',
            'icon': 'fa fa-unlock-alt fa-4x fa-fw'
        }];

    });
