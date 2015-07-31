'use strict';

angular.module('kpmApp')
    .controller('RekamMedisDiagnostikCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('medisdiagnostiks').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                $scope.kesimpulan.selected = $scope.data.kesimpulan;
                $scope.subkesimpulan.selected = $scope.data.subkesimpulan;
                $scope.bronkhodilator.selected = $scope.data.bronkhodilator;
                $scope.bronkhus.selected = $scope.data.bronkhus;
                $scope.skin.selected = $scope.data.skin;
                $scope.tuberkulin.selected = $scope.data.tuberkulin;

                socket.syncUpdates('medisdiagnostik', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Obstruktif', 'Restriktif', 'Mixed Type'];
        $scope.opt2 = ['Ringan', 'Sedang', 'Berat'];
        $scope.opt3 = ['Positif : PEFR > 20%', 'Negatif : PEFR < 20%'];
        $scope.opt4 = ['Positif PC20 > 8 mg/ml', 'Borderline PC20 4-8 mg/ml', 'Negatif PC20 < 4 mg/ml'];
        $scope.opt5 = ['Positif', 'Negatif'];
        $scope.opt6 = ['0 - 4 mm : Negatif', '5 - 9 mm : Meragukan', '10 - 15 mm : Positif', '> 15 mm : Positif Kali'];

        $scope.kesimpulan = {};
        $scope.subkesimpulan = {};
        $scope.bronkhodilator = {};
        $scope.bronkhus = {};
        $scope.skin = {};
        $scope.tuberkulin = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('medisdiagnostiks').customPUT({
                    bronkhoskopitgl: $scope.data.bronkhoskopitgl,
                    bronkhoskopihasil: $scope.data.bronkhoskopihasil,
                    spirometertgl: $scope.data.spirometertgl,
                    evc: $scope.data.evc,
                    fvc: $scope.data.fvc,
                    fevi: $scope.data.fevi,
                    persenfvc: $scope.data.persenfvc,
                    persenfevi: $scope.data.persenfevi,
                    kesimpulan: $scope.kesimpulan.selected,
                    subkesimpulan: $scope.subkesimpulan.selected,
                    pefrtgl: $scope.data.pefrtgl,
                    pefr: $scope.data.pefr,
                    bronkhodilatortgl: $scope.data.bronkhodilatortgl,
                    bronkhodilator: $scope.bronkhodilator.selected,
                    bronkhustgl: $scope.data.bronkhustgl,
                    bronkhus: $scope.bronkhus.selected,
                    subbronkhus: $scope.data.subbronkhus,
                    ekgtgl: $scope.data.ekgtgl,
                    ekghasil: $scope.data.ekghasil,
                    treadmilltgl: $scope.data.treadmilltgl,
                    treadmillhasil: $scope.data.treadmillhasil,
                    lge: $scope.data.lge,
                    skin: $scope.skin.selected,
                    subskin: $scope.data.subskin,
                    tuberkulin: $scope.tuberkulin.selected,
                    pleuratgl: $scope.data.pleuratgl,
                    pleurahasil: $scope.data.pleurahasil,
                    histolitgl: $scope.data.histolitgl,
                    histolilokasi: $scope.data.histolilokasi,
                    histolibahan: $scope.data.histolibahan,
                    histolihasil: $scope.data.histolihasil
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
            socket.unsyncUpdates('medisdiagnostik');
        });
    });
