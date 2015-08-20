'use strict';

angular.module('kpmApp')
    .controller('StokRekapPerObatCtrl', function ($scope, Restangular, socket) {

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

        $scope.getObat = function () {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.obat = _.chain(datas).uniq('obat').pluck('obat').sortBy().value();
            });
        };
        $scope.getObat();

        $scope.getData = function (b, t, o) {
            Restangular.all('obats').customGETLIST().then(function (datas) {
                $scope.datas = _.filter(datas, function (value) {
                    return value.bulan === b.toString() && value.tahun === t.toString() && value.obat === o.toString();
                });
                $scope.pindahan = _.chain($scope.datas).uniq('pindahan').pluck('pindahan').sortBy().value();
                $scope.masuk = _.chain($scope.datas).uniq('masuk').pluck('masuk').sortBy().value();
            });
            Restangular.all('reseps').customGETLIST().then(function (datas) {
                var filter1 = _.filter(datas, function (value) {
                    return value.lists.length > 0;
                });

                var arr1 = [];
                _.forEach(filter1, function (val1) {
                    _.forEach(val1.lists, function (val2) {
                        _.forEach(val2.items, function (val3) {
                            arr1.push({
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

                var filter2 = _.filter(arr1, function (value) {
                    return value.obat === o;
                });
                $scope.bydate = _.chain(filter2).uniq('tanggal').pluck('tanggal').sortBy().value();

                var arr2 = [];
                _.forEach($scope.bydate, function (val1) {
                    var filter = _.filter(filter2, function (val) {
                        return val.tanggal === val1;
                    });
                    var sum = 0;
                    if (filter.length > 1) {
                        _.forEach(filter, function (val) {
                            sum += val.jumlah;
                        });
                        _.forEach(filter, function (val) {
                            val.jumlah = sum;
                        });
                    }
                    var res = _.findWhere(filter, {
                        tanggal: val1
                    });
                    arr2.push(res);
                });

                var arr3 = [];
                _.forEach(arr2, function (val) {
                    arr3.push(val.jumlah);
                });

                function partition(arr, divider) {
                    var group = _.groupBy(arr, function (item, i) {
                        return Math.floor(i % divider);
                    });
                    return _.map(group);
                }
                $scope.column = partition(arr3, $scope.bydate.length);

                $scope.total = 0;
                _.forEach(arr3, function (val) {
                    $scope.total += val;
                });
            });

            socket.syncUpdates('resep', $scope.datas);
        };

        $scope.get = function (b, t, o) {
            $scope.ob = o;
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getData($scope.bulan, $scope.tahun, $scope.ob);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('resep');
        });

    });
