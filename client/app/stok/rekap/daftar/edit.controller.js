'use strict';

angular.module('kpmApp')
    .controller('StokEditRekapCtrl', function ($scope, Restangular, socket, $alert, $stateParams) {

        var date = new Date();
        $scope.bulan = date.getMonth();
        $scope.tahun = date.getFullYear();

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);

        $scope.getData = function () {
            Restangular.one('rekaps').customGET($stateParams.id).then(function (data) {
                $scope.data = data;

                $scope.b = {
                    selected: $scope.bulans[$scope.data.bulan]
                };
                $scope.t = {
                    selected: $scope.data.tahun
                };
                $scope.obat.selected = {
                    nama: $scope.data.nama
                };
                $scope.satuan = $scope.data.satuan;

                socket.syncUpdates('rekap', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        };

        $scope.getObat();

        $scope.obat = {};

        $scope.pick = function (x) {
            $scope.satuan = x.satuan;
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('rekaps').customPUT({
                    bulan: _.indexOf($scope.bulans, $scope.b.selected),
                    tahun: $scope.t.selected,
                    obat: $scope.obat.selected,
                    pindahan: $scope.data.pindahan,
                    masuk: $scope.data.masuk
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
            socket.unsyncUpdates('rekap');
        });

    });
