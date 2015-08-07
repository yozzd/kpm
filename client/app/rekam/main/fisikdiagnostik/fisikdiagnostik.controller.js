'use strict';

angular.module('kpmApp')
    .controller('RekamFisikDiagnostikCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('fisikdiagnostiks').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.keadaan.selected = $scope.data.keadaan === '' ? null : $scope.data.keadaan;
                $scope.kesadaran.selected = $scope.data.kesadaran === '' ? null : $scope.data.kesadaran;
                $scope.dispnoe.selected = $scope.data.dispnoe === '' ? null : $scope.data.dispnoe;
                $scope.orthopnoe.selected = $scope.data.orthopnoe === '' ? null : $scope.data.orthopnoe;
                $scope.odem.selected = $scope.data.odem === '' ? null : $scope.data.odem;
                $scope.anemis.selected = $scope.data.anemis === '' ? null : $scope.data.anemis;
                $scope.sianosis.selected = $scope.data.sianosis === '' ? null : $scope.data.sianosis;
                $scope.ikhterus.selected = $scope.data.ikhterus === '' ? null : $scope.data.ikhterus;

                socket.syncUpdates('fisikdiagnostik', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Ya', 'Tidak'];
        $scope.opt2 = ['Baik', 'Sedang', 'Jelek'];
        $scope.opt3 = ['CM', 'CM Lemah', 'Somnolen', 'Soporous', 'Coma'];

        $scope.keadaan = {};
        $scope.kesadaran = {};
        $scope.dispnoe = {};
        $scope.orthopnoe = {};
        $scope.odem = {};
        $scope.anemis = {};
        $scope.sianosis = {};
        $scope.ikhterus = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('fisikdiagnostiks').customPUT({
                    keadaan: $scope.keadaan.selected,
                    kesadaran: $scope.kesadaran.selected,
                    frekuensi: $scope.data.frekuensi,
                    nadi: $scope.data.nadi,
                    suhu: $scope.data.suhu,
                    dispnoe: $scope.dispnoe.selected,
                    orthopnoe: $scope.orthopnoe.selected,
                    odem: $scope.odem.selected,
                    lain: $scope.data.lain,
                    inspeksi: $scope.data.inspeksi,
                    palpasi: $scope.data.palpasi,
                    perkusi: $scope.data.perkusi,
                    auskultasi: $scope.data.auskultasi,
                    hr: $scope.data.hr,
                    st: $scope.data.st,
                    abdomen: $scope.data.abdomen,
                    hepar: $scope.data.hepar,
                    limpa: $scope.data.limpa,
                    extrimitas: $scope.data.extrimitas,
                    anemis: $scope.anemis.selected,
                    sianosis: $scope.sianosis.selected,
                    ikhterus: $scope.ikhterus.selected,
                    berat: $scope.data.berat,
                    tinggi: $scope.data.tinggi,
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
            socket.unsyncUpdates('fisikdiagnostik');
        });

    });
