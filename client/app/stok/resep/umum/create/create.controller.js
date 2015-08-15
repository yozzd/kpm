'use strict';

angular.module('kpmApp')
    .controller('StokCreateUmumCtrl', function ($scope, Restangular, $alert, Upload) {

        $scope.getPasien = function () {
            Restangular.all('pasiens').customGETLIST().then(function (datas) {
                $scope.filter = _.filter(datas, function (value) {
                    return value.pembiayaan !== 'BPJS';
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
            _.forEach($scope.arr, function (val, key) {
                $scope.temp.push({
                    oid: $scope.arr[key].obat.selected._id,
                    obat: $scope.arr[key].obat.selected.nama,
                    satuan: $scope.arr[key].obat.selected.satuan,
                    keterangan: $scope.arr[key].keterangan,
                    jumlah: $scope.arr[key].jumlah
                });
            });
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.file !== null) {
                    Upload.upload({
                        url: '/api/reseps/' + $scope.pasien.selected._id,
                        file: $scope.file,
                        method: 'PUT',
                        fields: {
                            tanggal: $scope.data.tanggal,
                            dokter: $scope.data.dokter,
                            arr: $scope.temp
                        },
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
                        $alert({
                            content: 'Data sukses disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    }).error(function (data, status, headers, config) {
                        console.log('error status: ' + status);
                    });
                }
            }
        };
    });
