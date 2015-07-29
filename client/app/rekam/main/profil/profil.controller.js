'use strict';

angular.module('kpmApp')
    .controller('RekamProfilCtrl', function ($scope, $stateParams, Restangular, socket, $alert) {

        $scope.jeniskelamin = {};
        $scope.jeniskelamins = ['L', 'P'];

        $scope.statuskeluarga = {};
        $scope.statuskeluargas = ['A', 'I', 'S', 'J', 'D'];

        $scope.dikirim = {};
        $scope.dikirims = ['Puskesmas', 'Rumah Sakit / Klinik', 'Praktek Dokter Swasta (PDS)', 'Datang Sendiri', 'Dll'];

        $scope.pembiayaan = {};
        $scope.pembiayaans = ['BPJS', 'Biaya Sendiri', 'Dll'];

        $scope.getData = function () {
            Restangular.one('pasiens').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data.nama;
                $scope.jeniskelamin.selected = $scope.data.jeniskelamin;
                $scope.statuskeluarga.selected = $scope.data.statuskeluarga;
                $scope.dikirim.selected = $scope.data.dikirim === '' ? null : $scope.data.dikirim;
                $scope.pembiayaan.selected = $scope.data.pembiayaan === '' ? null : $scope.data.pembiayaan;
                socket.syncUpdates('pasien', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('pasiens').customPUT({
                    nomor: $scope.data.nomor,
                    tanggal: $scope.data.tanggal,
                    nama: $scope.data.nama,
                    umur: $scope.data.umur,
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
                }, $stateParams.id).then(function () {
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
            socket.unsyncUpdates('pasien');
        });

    });
