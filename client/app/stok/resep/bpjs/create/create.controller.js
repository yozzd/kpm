'use strict';

angular.module('kpmApp')
    .controller('StokCreateBpjsCtrl', function ($scope, Restangular, $alert) {

        $scope.getPasien = function () {
            Restangular.all('pasiens').customGETLIST().then(function (datas) {
                $scope.filter = _.filter(datas, function (value) {
                    return value.pembiayaan === 'BPJS';
                });
                $scope.pasiens = $scope.filter;
            });
        };

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        };

        $scope.getPasien();
        $scope.getObat();
        $scope.pasien = {};

        $scope.pick = function (x) {
            $scope.umur = x.umur + ' ' + x.satuanumur;
            $scope.jeniskelamin = x.jeniskelamin;
        };

        $scope.arr = [{
            obat: '',
            keterangan: '',
            jumlah: ''
        }];
        $scope.tambah = function () {
            $scope.arr.push({
                obat: '',
                keterangan: '',
                jumlah: ''
            });
        };
        $scope.kurang = function () {
            $scope.arr.splice($scope.arr.length - 1);
        };

        $scope.submit = function (form) {
            $scope.temp = [];
            for (var i = 0; i < $scope.arr.length; i++) {
                $scope.temp.push({
                    obat: $scope.arr[i].obat.selected.nama,
                    satuan: $scope.arr[i].obat.selected.satuan,
                    keterangan: $scope.arr[i].keterangan,
                    jumlah: $scope.arr[i].jumlah
                });
            }
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('reseps').customPUT({
                    tanggal: $scope.data.tanggal,
                    arr: $scope.temp
                }, $scope.pasien.selected._id).then(function () {
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
