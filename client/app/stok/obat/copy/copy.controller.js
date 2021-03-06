'use strict';

angular.module('kpmApp')
    .controller('StokCopyObatCtrl', function ($scope, Restangular, socket, $alert, $timeout) {

        var date = new Date();
        $scope.bulan = date.getMonth();
        $scope.tahun = date.getFullYear();

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);
        $scope.b1 = {
            selected: $scope.bulans[$scope.bulan]
        };
        $scope.t1 = {
            selected: $scope.tahun
        };
        if ($scope.bulan === 11) {
            $scope.b2 = {
                selected: $scope.bulans[0]
            };
        } else {
            $scope.b2 = {
                selected: $scope.bulans[$scope.bulan + 1]
            };
        }
        $scope.t2 = {
            selected: $scope.tahun
        };

        $scope.getData = function (b, t) {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = _.filter(datas, function (value) {
                    return value.bulan === b.toString() && value.tahun === t.toString();
                });
                $scope.obat = _.chain($scope.datas).uniq('obat').pluck('obat').sortBy().value();
                $scope.pindahan = _.chain($scope.datas).uniq('pindahan').pluck('pindahan').sortBy().value();
                $scope.masuk = _.chain($scope.datas).uniq('masuk').pluck('masuk').sortBy().value();

                socket.syncUpdates('obats', $scope.datas);
            });
            Restangular.all('reseps').customGETLIST().then(function (datas) {

                function total(x, y) {
                    var filter1;
                    if (x === 'bpjs') {
                        filter1 = _.filter(datas, function (value) {
                            return value.lists.length > 0 && value._pasien.pembiayaan === 'BPJS';
                        });
                    } else if (x === 'umum') {
                        filter1 = _.filter(datas, function (value) {
                            return value.lists.length > 0 && value._pasien.pembiayaan !== 'BPJS';
                        });
                    }

                    var temp1 = [];
                    _.forEach(filter1, function (val1) {
                        _.forEach(val1.lists, function (val2) {
                            _.forEach(val2.items, function (val3) {
                                temp1.push({
                                    tanggal: val2.tanggal,
                                    bulan: val2.bulan,
                                    tahun: val2.tahun,
                                    oid: val3.oid,
                                    obat: val3.obat,
                                    jumlah: val3.jumlah
                                });
                            });
                        });
                    });

                    var filter2 = _.filter(temp1, function (value) {
                        return value.bulan === b.toString() && value.tahun === t.toString();
                    });

                    var arr = [];
                    var filter3 = _.filter(filter2, function (val2) {
                        return val2.obat === y;
                    });
                    _.forEach(filter3, function (val2) {
                        arr.push(val2.jumlah);
                    });

                    var count = _.reduce(arr, function (a, b) {
                        return a + b;
                    });
                    return count;
                }

                var arr1 = [];
                _.forEach($scope.obat, function (val) {
                    if (total('bpjs', val) === undefined && total('umum', val) === undefined) {
                        arr1.push(0);
                    } else if (total('bpjs', val) !== undefined && total('umum', val) === undefined) {
                        arr1.push(total('bpjs', val));
                    } else if (total('bpjs', val) === undefined && total('umum', val) !== undefined) {
                        arr1.push(total('umum', val));
                    } else {
                        arr1.push(total('bpjs', val) + total('umum', val));
                    }
                });

                var arr2 = [];
                _.forEach($scope.datas, function (val) {
                    arr2.push({
                        obat: val.obat,
                        satuan: val.satuan,
                        pindahan: val.pindahan,
                        masuk: val.masuk
                    });
                });
                var arr3 = _.chain(arr2).sortBy('obat').value();
                var arr4 = [];
                _.forEach(arr1, function (val) {
                    arr4.push({
                        keluar: val
                    });
                });
                $scope.result = _.merge(arr4, arr3);
            });
        };

        $scope.getData($scope.bulan, $scope.tahun);

        $scope.get = function (b, t) {
            $scope.dialog = false;
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getData($scope.bulan, $scope.tahun);
            if ($scope.bulan === 11) {
                $scope.b2 = {
                    selected: $scope.bulans[0]
                };
            } else {
                $scope.b2 = {
                    selected: $scope.bulans[$scope.bulan + 1]
                };
            }
        };

        $scope.konfirmasi = function () {
            $scope.dialog = true;
        };

        $scope.copy = function (b1, t1, b2, t2) {
            $scope.bulan = _.indexOf($scope.bulans, b1);
            $scope.tahun = t1;
            $scope.getData($scope.bulan, $scope.tahun);
            var arr = [];
            _.forEach($scope.result, function () {
                arr.push({
                    bulan: _.indexOf($scope.bulans, b2),
                    tahun: t2
                });
            });
            $scope.arr = _.merge($scope.result, arr);
            Restangular.all('obats/copy').customPOST({
                arr: $scope.arr
            }).then(function () {
                $scope.loading = true;
                $timeout(function () {
                    $scope.loading = false;
                    $alert({
                        content: 'Data sukses di-copy',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                }, 3000);
            });
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('obat');
        });

    });
