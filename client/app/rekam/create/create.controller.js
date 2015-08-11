'use strict';

angular.module('kpmApp')
    .controller('RekamCreateCtrl', function ($scope, Restangular, $alert) {

        $scope.satuanumur = {
            selected: 'tahun'
        };
        $scope.satuanumurs = ['tahun', 'bulan'];

        $scope.jeniskelamin = {};
        $scope.jeniskelamins = ['L', 'P'];

        $scope.statuskeluarga = {};
        $scope.statuskeluargas = ['A', 'I', 'S', 'J', 'D'];

        $scope.dikirim = {};
        $scope.dikirims = ['Puskesmas', 'Rumah Sakit / Klinik', 'Praktek Dokter Swasta (PDS)', 'Datang Sendiri', 'Dll'];

        $scope.pembiayaan = {};
        $scope.pembiayaans = ['BPJS', 'Biaya Sendiri', 'Dll'];


        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('pasiens').customPOST({
                    nomor: $scope.data.nomor,
                    tanggal: $scope.data.tanggal,
                    nama: $scope.data.nama,
                    umur: $scope.data.umur,
                    satuanumur: $scope.satuanumur.selected,
                    jeniskelamin: $scope.jeniskelamin.selected,
                    jalan: $scope.data.jalan,
                    lingkungan: $scope.data.lingkungan,
                    kelkec: $scope.data.kelkec,
                    kotkab: $scope.data.kotkab,
                    provinsi: $scope.data.provinsi,
                    telp: $scope.data.telp,
                    suku: $scope.data.suku,
                    agama: $scope.data.agama,
                    pekerjaan: $scope.data.pekerjaan,
                    statuskeluarga: $scope.statuskeluarga.selected,
                    dikirim: $scope.dikirim.selected,
                    kdikirim: $scope.pembiayaan.selected === 'Datang Sendiri' ? '' : $scope.data.kdikirim,
                    pembiayaan: $scope.pembiayaan.selected,
                    kpembiayaan: $scope.pembiayaan.selected === 'BPJS' || $scope.pembiayaan.selected === 'Biaya Sendiri' ? '' : $scope.data.kpembiayaan
                }).then(function (data) {
                    if (!data.error) {
                        $alert({
                            content: 'Data sukses disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    } else {
                        $alert({
                            title: 'Error!',
                            content: data.error,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    }
                });
            }
        };

    });
