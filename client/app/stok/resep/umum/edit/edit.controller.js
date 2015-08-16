'use strict';

angular.module('kpmApp')
    .controller('StokEditUmumCtrl', function ($scope, Restangular, $stateParams, $modal, Upload, $alert) {

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
                type: contentType
            });
            return blob;
        }

        $scope.getData = function () {
            Restangular.one('reseps').customGET($stateParams.id + '/' + $stateParams.lid).then(function (data) {
                $scope.data = data[0];
                $scope.pasien.selected = {
                    nama: $scope.data.nama
                };
                $scope.umur = $scope.data.umur + ' ' + $scope.data.satuanumur;
                $scope.jeniskelamin = $scope.data.jeniskelamin;
                $scope.blobUrl = !$scope.data.image ? '' : URL.createObjectURL(b64toBlob($scope.data.image, $scope.data.contenttype));

                $scope.arr = [];
                _.forEach($scope.data.items, function (val, key) {
                    $scope.arr.push({
                        obat: {
                            selected: {
                                obat: $scope.data.items[key].obat,
                                satuan: $scope.data.items[key].satuan
                            }
                        },
                        keterangan: $scope.data.items[key].keterangan,
                        jumlah: $scope.data.items[key].jumlah
                    });
                });

            });
        };

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

        $scope.getData();
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

        $scope.imgmodal = function (blobUrl) {
            var scope = $scope.$new();
            scope.data = {
                blobUrl: blobUrl
            };
            var imgmodal = $modal({
                scope: scope,
                template: 'app/stok/resep/umum/detail/template.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            imgmodal.$promise.then(imgmodal.show);
        };

        $scope.submit = function (form) {
            $scope.temp = [];
            _.forEach($scope.arr, function (val, key) {
                $scope.temp.push({
                    obat: $scope.arr[key].obat.selected.obat,
                    satuan: $scope.arr[key].obat.selected.satuan,
                    keterangan: $scope.arr[key].keterangan,
                    jumlah: $scope.arr[key].jumlah
                });
            });
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.file !== null) {
                    Upload.upload({
                        url: '/api/reseps/upres/' + $stateParams.id + '/' + $stateParams.lid,
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
                        $scope.getData();
                        $alert({
                            content: 'Data sukses diupdate',
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
