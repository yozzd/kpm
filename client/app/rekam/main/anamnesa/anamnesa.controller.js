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

                $scope.dahak.selected = $scope.data.dahak === '' ? null : $scope.data.dahak;
                $scope.volumedahak.selected = $scope.data.volumedahak === '' ? null : $scope.data.volumedahak;
                $scope.warnadahak.selected = $scope.data.warnadahak === '' ? null : $scope.data.warnadahak;
                $scope.konsistensidahak.selected = $scope.data.konsistensidahak === '' ? null : $scope.data.konsistensidahak;

                $scope.nyeridada.selected = $scope.data.nyeridada === '' ? null : $scope.data.nyeridada;

                $scope.demam.selected = $scope.data.demam === '' ? null : $scope.data.demam;
                $scope.lamademam.selected1 = $scope.data.lamademam === '' ? null : $scope.data.lamademam.split(' ')[0];
                $scope.lamademam.selected2 = $scope.data.lamademam === '' ? null : $scope.data.lamademam.split(' ')[1];
                $scope.lamademam.selected3 = $scope.data.lamademam === '' ? null : $scope.data.lamademam.split(' ')[2];
                $scope.pagisiangdemam.selected = $scope.data.pagisiangdemam === '' ? null : $scope.data.pagisiangdemam;
                $scope.soredemam.selected = $scope.data.soredemam === '' ? null : $scope.data.soredemam;
                $scope.malamdemam.selected = $scope.data.malamdemam === '' ? null : $scope.data.malamdemam;

                $scope.keringat.selected = $scope.data.keringat === '' ? null : $scope.data.keringat;
                $scope.nafsu.selected = $scope.data.nafsu === '' ? null : $scope.data.nafsu;
                $scope.lemah.selected = $scope.data.lemah === '' ? null : $scope.data.lemah;

                $scope.tbcparu.selected = $scope.data.tbcparu === '' ? null : $scope.data.tbcparu;
                $scope.asma.selected = $scope.data.asma === '' ? null : $scope.data.asma;

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
        $scope.opt8 = ['Jernih', 'Kuning', 'Hijau', 'Kemerahan campur darah'];
        $scope.opt9 = ['Encer', 'Kental'];

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

        $scope.dahak = {};
        $scope.volumedahak = {};
        $scope.warnadahak = {};
        $scope.konsistensidahak = {};

        $scope.cldahak = function (x) {
            if (x === 'Tidak') {
                $scope.volumedahak.selected = null;
                $scope.warnadahak.selected = null;
                $scope.konsistensidahak.selected = null;
            }
        };

        $scope.nyeridada = {};

        $scope.clnyeridada = function (x) {
            if (x === 'Tidak') {
                $scope.data.lokasinyeridada = null;
            }
        };

        $scope.demam = {};
        $scope.lamademam = {};
        $scope.pagisiangdemam = {};
        $scope.soredemam = {};
        $scope.malamdemam = {};

        $scope.cldemam = function (x) {
            if (x === 'Tidak') {
                $scope.lamademam.selected1 = null;
                $scope.lamademam.selected2 = null;
                $scope.lamademam.selected3 = null;
                $scope.pagisiangdemam.selected = null;
                $scope.soredemam.selected = null;
                $scope.malamdemam.selected = null;
            }
        };

        $scope.keringat = {};
        $scope.nafsu = {};
        $scope.lemah = {};

        $scope.tbcparu = {};

        $scope.cltbcparu = function (x) {
            if (x === 'Tidak') {
                $scope.data.tbcparuya = null;
            }
        };

        $scope.asma = {};

        $scope.clasma = function (x) {
            if (x === 'Tidak') {
                $scope.data.asmaya = null;
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
                    dahak: $scope.dahak.selected,
                    volumedahak: $scope.dahak.selected === 'Tidak' ? '' : $scope.volumedahak.selected,
                    warnadahak: $scope.dahak.selected === 'Tidak' ? '' : $scope.warnadahak.selected,
                    konsistensidahak: $scope.dahak.selected === 'Tidak' ? '' : $scope.konsistensidahak.selected,
                    nyeridada: $scope.nyeridada.selected,
                    lokasinyeridada: $scope.nyeridada.selected === 'Tidak' ? '' : $scope.data.lokasinyeridada,
                    demam: $scope.demam.selected,
                    lamademam: $scope.demam.selected === 'Tidak' ? '' : $scope.lamademam.selected1 + ' ' + $scope.lamademam.selected2 + ' ' + $scope.lamademam.selected3,
                    pagisiangdemam: $scope.demam.selected === 'Tidak' ? '' : $scope.pagisiangdemam.selected,
                    soredemam: $scope.demam.selected === 'Tidak' ? '' : $scope.soredemam.selected,
                    malamdemam: $scope.demam.selected === 'Tidak' ? '' : $scope.malamdemam.selected,
                    keringat: $scope.keringat.selected,
                    nafsu: $scope.nafsu.selected,
                    lemah: $scope.lemah.selected,
                    lain: $scope.data.lain,
                    penyakit: $scope.data.penyakit,
                    pengobatan: $scope.data.pengobatan,
                    lamamerokok: $scope.data.lamamerokok,
                    banyakrokok: $scope.data.banyakrokok,
                    jenisobat: $scope.data.jenisobat,
                    lamaobat: $scope.data.lamaobat,
                    jenisalkohol: $scope.data.jenisalkohol,
                    lamaalkohol: $scope.data.lamaalkohol,
                    tbcparu: $scope.tbcparu.selected,
                    tbcparuya: $scope.tbcparu.selected === 'Tidak' ? '' : $scope.data.tbcparuya,
                    asma: $scope.asma.selected,
                    asmaya: $scope.asma.selected === 'Tidak' ? '' : $scope.data.asmaya
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
