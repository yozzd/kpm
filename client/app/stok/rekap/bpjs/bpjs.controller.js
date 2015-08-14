'use strict';

angular.module('kpmApp')
    .controller('StokRekapBpjsCtrl', function ($scope, Restangular, socket) {

        var date = new Date();
        $scope.bulan = date.getMonth();
        $scope.tahun = date.getFullYear();

        $scope.getData = function (b, t) {
            Restangular.all('reseps').customGETLIST().then(function (datas) {

                var filter1 = _.filter(datas, function (value) {
                    return value.lists.length > 0 && value._pasien.pembiayaan === 'BPJS';
                });

                var temp = [];
                _.forEach(filter1, function (val1) {
                    _.forEach(val1.lists, function (val2) {
                        _.forEach(val2.items, function (val3) {
                            temp.push({
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

                var filter2 = _.filter(temp, function (value) {
                    return value.bulan === b.toString() && value.tahun === t.toString();
                });
                $scope.bydate = _.chain(filter2).uniq('tanggal').pluck('tanggal').sortBy().value();
                $scope.obat = _.chain(filter2).uniq('obat').pluck('obat').sortBy().value();

                var temp2 = [];
                _.forEach($scope.obat, function (val1) {
                    var filter3 = _.filter(filter2, function (val2) {
                        return val2.obat === val1;
                    });
                    temp2.push({
                        items: filter3
                    });
                });

                $scope.temp3 = [];
                _.forEach($scope.bydate, function (val1) {
                    _.forEach(temp2, function (val2) {
                        var filter4 = _.findWhere(val2.items, {
                            tanggal: val1
                        });
                        $scope.temp3.push(filter4);
                    });
                });
                $scope.cut = _.groupBy(_.flatten($scope.temp3), function (item, i) {
                    return Math.floor(i % $scope.obat.length);
                });
                $scope.result = _.map($scope.cut);

                socket.syncUpdates('resep', $scope.datas);
            });
        };

        $scope.getData($scope.bulan, $scope.tahun);

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('resep');
        });

    });
