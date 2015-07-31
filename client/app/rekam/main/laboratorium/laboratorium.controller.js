'use strict';

angular.module('kpmApp')
    .controller('RekamLaboratoriumCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('laboratoriums').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;

                socket.syncUpdates('laboratorium', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('laboratoriums').customPUT({
                    hb: $scope.data.hb,
                    led: $scope.data.led,
                    leukosit: $scope.data.leukosit,
                    thrombosit: $scope.data.thrombosit,
                    erythrosit: $scope.data.erythrosit,
                    haematokrit: $scope.data.haematokrit,
                    darah: $scope.data.darah,
                    ph: $scope.data.ph,
                    reduksi: $scope.data.reduksi,
                    protein: $scope.data.protein,
                    bilirubin: $scope.data.bilirubin,
                    sedimen: $scope.data.sedimen,
                    faeces: $scope.data.faeces,
                    dsbta: $scope.data.dsbta,
                    dsbta1: $scope.data.dsbta1,
                    dsbta2: $scope.data.dsbta2,
                    dsbta3: $scope.data.dsbta3,
                    btatgl: $scope.data.btatgl,
                    btasensitif: $scope.data.btasensitif,
                    btaresinten: $scope.data.btaresinten,
                    dssputum: $scope.data.dssputum,
                    sputumtgl: $scope.data.sputumtgl,
                    sputumsensitif: $scope.data.sputumsensitif,
                    sputumresinten: $scope.data.sputumresinten,
                    jamur: $scope.data.jamur,
                    jamurtgl: $scope.data.jamurtgl,
                    kulturpleuratgl: $scope.data.kulturpleuratgl,
                    analisapleuratgl: $scope.data.analisapleuratgl,
                    rivalta: $scope.data.rivalta,
                    ldhpleura: $scope.data.ldhpleura,
                    proteinpleura: $scope.data.proteinpleura,
                    transudat: $scope.data.transudat,
                    faalhatitgl: $scope.data.faalhatitgl,
                    sgot: $scope.data.sgot,
                    sgpt: $scope.data.sgpt,
                    biltotal: $scope.data.biltotal,
                    bildirect: $scope.data.bildirect,
                    fosfatase: $scope.data.fosfatase,
                    elektrofores: $scope.data.elektrofores,
                    total: $scope.data.total,
                    faalginjaltgl: $scope.data.faalginjaltgl,
                    ureum: $scope.data.ureum,
                    kratinin: $scope.data.kratinin,
                    asamurat: $scope.data.asamurat,
                    kratininurine: $scope.data.kratininurine,
                    proteinurine: $scope.data.proteinurine,
                    elektrolittgl: $scope.data.elektrolittgl,
                    natrium: $scope.data.natrium,
                    kalium: $scope.data.kalium,
                    chlorida: $scope.data.chlorida,
                    agda: $scope.data.agda,
                    jantungtgl: $scope.data.jantungtgl,
                    ekg: $scope.data.ekg,
                    treadmill: $scope.data.treadmill,
                    cpk: $scope.data.cpk,
                    ldhjantung: $scope.data.ldhjantung,
                    troponin: $scope.data.troponin,
                    glukosatgl: $scope.data.glukosatgl,
                    glukosapuasa: $scope.data.glukosapuasa,
                    glukosapp: $scope.data.glukosapp,
                    glukosarandom: $scope.data.glukosarandom,
                    lipidtgl: $scope.data.lipidtgl,
                    hdl: $scope.data.hdl,
                    ldl: $scope.data.ldl,
                    cholesterol: $scope.data.cholesterol,
                    triglecerida: $scope.data.triglecerida,
                    lipidtotal: $scope.data.lipidtotal,
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
            socket.unsyncUpdates('laboratorium');
        });

    });
