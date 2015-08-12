'use strict';

angular.module('kpmApp')
    .controller('StokCreateRekapCtrl', function ($scope, Restangular, $alert) {

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
        $scope.data = {};
        $scope.data.pindahan = 0;
        $scope.data.masuk = 0;

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        };

        $scope.getObat();

        $scope.obat = {};

        $scope.pick = function (x, b, t) {
            $scope.satuan = x.satuan;
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getData(x._id, $scope.bulan, $scope.tahun);
            $scope.data.masuk = 0;
            $scope.infos = true;
            $scope.info = 'Data pindahan bulan ' + $scope.bulans[_.indexOf($scope.bulans, b) - 1];
        };

        $scope.getData = function (oid, b, t) {
            Restangular.all('rekaps').customGETLIST().then(function (datas) {
                $scope.filter = _.filter(datas, function (value) {
                    return value.oid === oid.toString() && value.bulan === b - 1 && value.tahun === t;
                });
                $scope.data.pindahan = $scope.filter.length < 1 ? 0 : $scope.filter[0].sisa;
            });
        };

        $scope.get = function (x, b, t) {
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getData(x._id, $scope.bulan, $scope.tahun);
            $scope.data.masuk = 0;
            $scope.infos = true;
            $scope.info = 'Data pindahan bulan ' + $scope.bulans[_.indexOf($scope.bulans, b) - 1];
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('rekaps').customPOST({
                    bulan: _.indexOf($scope.bulans, $scope.b.selected),
                    tahun: $scope.t.selected,
                    obat: $scope.obat.selected,
                    pindahan: $scope.data.pindahan,
                    masuk: $scope.data.masuk
                }).then(function () {
                    $alert({
                        content: 'Data sukses disimpan',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };
    });
