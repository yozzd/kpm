'use strict';

angular.module('kpmApp')
    .controller('StokCreateObatCtrl', function ($scope, Restangular, $alert) {

        var date = new Date();
        $scope.bulan = date.getMonth();
        $scope.tahun = date.getFullYear();

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);
        $scope.b = {
            selected: $scope.bulans[$scope.bulan]
        };
        $scope.t = {
            selected: $scope.tahun
        };

        $scope.satuan = {};
        $scope.satuans = ['Kapsul', 'Sirup', 'Tablet'];

        $scope.data = {};
        $scope.data.pindahan = 0;
        $scope.data.masuk = 0;

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.obats = _.chain(datas).uniq('obat').pluck('obat').sortBy().value();
            });
        };
        $scope.getObat();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('obats').customPOST({
                    bulan: _.indexOf($scope.bulans, $scope.b.selected),
                    tahun: $scope.t.selected,
                    obat: $scope.data.obat,
                    satuan: $scope.satuan.selected,
                    pindahan: $scope.data.pindahan,
                    masuk: $scope.data.masuk
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
