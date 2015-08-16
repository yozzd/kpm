'use strict';

angular.module('kpmApp')
    .controller('StokRekapUmumCtrl', function ($scope, Restangular, socket) {

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

        $scope.getData = function (b, t) {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = _.filter(datas, function (value) {
                    return value.bulan === b.toString() && value.tahun === t.toString();
                });
                $scope.obat = _.chain($scope.datas).uniq('obat').pluck('obat').sortBy().value();
            });
            Restangular.all('reseps').customGETLIST().then(function (datas) {

                var filter1 = _.filter(datas, function (value) {
                    return value.lists.length > 0 && value._pasien.pembiayaan !== 'BPJS';
                });

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
                $scope.bydate = _.chain(filter2).uniq('tanggal').pluck('tanggal').sortBy().value();

                var temp2 = [];
                var jumlah = [];
                _.forEach($scope.obat, function (val1) {
                    var filter3 = _.filter(filter2, function (val2) {
                        return val2.obat === val1;
                    });
                    var sum = 0;
                    _.forEach(filter3, function (val2) {
                        sum += val2.jumlah;
                    });
                    jumlah.push(sum);
                    temp2.push(filter3);
                });

                var temp3 = [];
                _.forEach($scope.bydate, function (val1) {
                    _.forEach(temp2, function (val2) {
                        var filter4 = _.findWhere(val2, {
                            tanggal: val1
                        });
                        temp3.push(filter4);
                    });
                });

                var temp4 = [];
                _.forEach(temp3, function (val) {
                    if (val === undefined) {
                        temp4.push(0);
                    } else {
                        temp4.push(val.jumlah);
                    }
                });

                $scope.total = _.reduce(jumlah, function (a, b) {
                    return a + b;
                });

                //column partition
                function partition1(arr, divider) {
                    var group = _.groupBy(arr, function (item, i) {
                        return Math.floor(i % divider);
                    });
                    return _.map(group);
                }
                //row partition
                function partition2(arr, divider) {
                    var group = _.groupBy(arr, function (item, i) {
                        return Math.floor(i / divider);
                    });
                    return _.map(group);
                }

                $scope.jumlah = partition1(jumlah, $scope.obat.length);
                $scope.column = partition1(temp4, $scope.obat.length);

                var crow = partition2(temp4, $scope.obat.length);
                var temp5 = [];
                _.forEach(crow, function (val, key) {
                    var count = _.reduce(crow[key], function (a, b) {
                        return a + b;
                    });
                    temp5.push(count);
                });
                $scope.row = partition1(temp5, $scope.bydate.length);

                socket.syncUpdates('resep', $scope.datas);
            });
        };

        $scope.getData($scope.bulan, $scope.tahun);

        $scope.get = function (b, t) {
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getData($scope.bulan, $scope.tahun);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('resep');
        });

    });
