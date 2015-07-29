'use strict';

angular.module('kpmApp')
    .controller('RekamAnamnesaCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('anamnesas').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.batuk.selected = $scope.data.batuk === '' ? null : $scope.data.batuk;
                $scope.lamabatuk.selected1 = $scope.data.lamabatuk === '' ? null : $scope.data.lamabatuk.split(' ')[0];
                $scope.lamabatuk.selected2 = $scope.data.lamabatuk === '' ? null : $scope.data.lamabatuk.split(' ')[1];
                $scope.lamabatuk.selected3 = $scope.data.lamabatuk === '' ? null : $scope.data.lamabatuk.split(' ')[2];
                $scope.intensitasbatuk.selected = $scope.data.intensitasbatuk === '' ? null : $scope.data.intensitasbatuk;
                $scope.frekuensibatuk.selected = $scope.data.frekuensibatuk === '' ? null : $scope.data.frekuensibatuk;

                $scope.batukdarah.selected = $scope.data.batukdarah === '' ? null : $scope.data.batukdarah;
                $scope.lamabatukdarah.selected1 = $scope.data.lamabatukdarah === '' ? null : $scope.data.lamabatukdarah.split(' ')[0];
                $scope.lamabatukdarah.selected2 = $scope.data.lamabatukdarah === '' ? null : $scope.data.lamabatukdarah.split(' ')[1];
                $scope.lamabatukdarah.selected3 = $scope.data.lamabatukdarah === '' ? null : $scope.data.lamabatukdarah.split(' ')[2];
                $scope.intensitasbatukdarah.selected = $scope.data.intensitasbatukdarah === '' ? null : $scope.data.intensitasbatukdarah;
                $scope.volumebatukdarah.selected = $scope.data.volumebatukdarah === '' ? null : $scope.data.volumebatukdarah;

                $scope.sesak.selected = $scope.data.sesak === '' ? null : $scope.data.sesak;
                $scope.lamasesak.selected1 = $scope.data.lamasesak === '' ? null : $scope.data.lamasesak.split(' ')[0];
                $scope.lamasesak.selected2 = $scope.data.lamasesak === '' ? null : $scope.data.lamasesak.split(' ')[1];
                $scope.lamasesak.selected3 = $scope.data.lamasesak === '' ? null : $scope.data.lamasesak.split(' ')[2];
                $scope.sifatsesak.selected = $scope.data.sifatsesak === '' ? null : $scope.data.sifatsesak;
                $scope.intensitassesak.selected = $scope.data.intensitassesak === '' ? null : $scope.data.intensitassesak;
                $scope.frekuensisesak.selected = $scope.data.frekuensisesak === '' ? null : $scope.data.frekuensisesak;
                $scope.mengisesak.selected = $scope.data.mengisesak === '' ? null : $scope.data.mengisesak;
                $scope.bertambahsesak.selected = $scope.data.bertambahsesak === '' ? null : $scope.data.bertambahsesak;
                
                socket.syncUpdates('anamnesa', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Ya', 'Tidak'];
        $scope.opt2 = ['&lt;', '&ge;', '&plusmn;'];
        $scope.opt3 = ['minggu', 'bulan', 'tahun'];
        $scope.opt4 = ['Ringan', 'Berat'];
        $scope.opt5 = ['Jarang', 'Sering'];
        $scope.opt6 = ['Sedikit', 'Banyak'];
        $scope.opt7 = ['Kumat-kumatan', 'Selalu Ada'];

        $scope.batuk = {};
        $scope.lamabatuk = {};
        $scope.intensitasbatuk = {};
        $scope.frekuensibatuk = {};

        $scope.clbatuk = function (x) {
            if (x === 'Tidak') {
                $scope.lamabatuk.selected1 = null;
                $scope.lamabatuk.selected2 = null;
                $scope.lamabatuk.selected3 = null;
                $scope.intensitasbatuk.selected = null;
                $scope.frekuensibatuk.selected = null;
            }
        };

        $scope.batukdarah = {};
        $scope.lamabatukdarah = {};
        $scope.intensitasbatukdarah = {};
        $scope.volumebatukdarah = {};

        $scope.clbatukdarah = function (x) {
            if (x === 'Tidak') {
                $scope.lamabatukdarah.selected1 = null;
                $scope.lamabatukdarah.selected2 = null;
                $scope.lamabatukdarah.selected3 = null;
                $scope.intensitasbatukdarah.selected = null;
                $scope.volumebatukdarah.selected = null;
            }
        };

        $scope.sesak = {};
        $scope.lamasesak = {};
        $scope.sifatsesak = {};
        $scope.intensitassesak = {};
        $scope.frekuensisesak = {};
        $scope.mengisesak = {};
        $scope.bertambahsesak = {};

        $scope.clsesak = function (x) {
            if (x === 'Tidak') {
                $scope.lamasesak.selected1 = null;
                $scope.lamasesak.selected2 = null;
                $scope.lamasesak.selected3 = null;
                $scope.sifatsesak.selected = null;
                $scope.intensitassesak.selected = null;
                $scope.frekuensisesak.selected = null;
                $scope.mengisesak.selected = null;
                $scope.bertambahsesak.selected = null;
                $scope.data.pencetussesak = null;
            }
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('anamnesas').customPUT({
                    batuk: $scope.batuk.selected,
                    lamabatuk: $scope.batuk.selected === 'Tidak' ? '' : $scope.lamabatuk.selected1 + ' ' + $scope.lamabatuk.selected2 + ' ' + $scope.lamabatuk.selected3,
                    intensitasbatuk: $scope.batuk.selected === 'Tidak' ? '' : $scope.intensitasbatuk.selected,
                    frekuensibatuk: $scope.batuk.selected === 'Tidak' ? '' : $scope.frekuensibatuk.selected,
                    batukdarah: $scope.batukdarah.selected,
                    lamabatukdarah: $scope.batukdarah.selected === 'Tidak' ? '' : $scope.lamabatukdarah.selected1 + ' ' + $scope.lamabatukdarah.selected2 + ' ' + $scope.lamabatukdarah.selected3,
                    intensitasbatukdarah: $scope.batukdarah.selected === 'Tidak' ? '' : $scope.intensitasbatukdarah.selected,
                    volumebatukdarah: $scope.batukdarah.selected === 'Tidak' ? '' : $scope.volumebatukdarah.selected,
                    sesak: $scope.sesak.selected,
                    lamasesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.lamasesak.selected1 + ' ' + $scope.lamasesak.selected2 + ' ' + $scope.lamasesak.selected3,
                    sifatsesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.sifatsesak.selected,
                    intensitassesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.intensitassesak.selected,
                    frekuensisesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.frekuensisesak.selected,
                    mengisesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.mengisesak.selected,
                    bertambahsesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.bertambahsesak.selected,
                    pencetussesak: $scope.sesak.selected === 'Tidak' ? '' : $scope.data.pencetussesak,
                }, $scope.data._id).then(function () {
                    $alert({
                        content: 'Data sukses diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('anamnesa');
        });

    });
