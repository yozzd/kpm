'use strict';

angular.module('kpmApp')
    .controller('StokDaftarBpjsCtrl', function ($scope, Restangular, socket, $modal) {

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

        $scope.getResep = function (b, t) {
            Restangular.all('reseps').customGETLIST().then(function (datas) {
                $scope.datas = datas;

                $scope.filter1 = _.filter($scope.datas, function (value) {
                    return value.lists.length > 0 && value._pasien.pembiayaan === 'BPJS';
                });

                $scope.temp = [];
                _.forEach($scope.filter1, function (val1) {
                    _.forEach(val1.lists, function (val2) {
                        $scope.temp.push({
                            id: val1._pasien._id,
                            lid: val2._id,
                            tanggal: val2.tanggal,
                            bulan: val2.bulan,
                            tahun: val2.tahun,
                            nama: val1._pasien.nama,
                            umur: val1._pasien.umur,
                            satuanumur: val1._pasien.satuanumur,
                            jeniskelamin: val1._pasien.jeniskelamin
                        });
                    });
                });
                $scope.match = _.filter($scope.temp, function (value) {
                    return value.bulan === b.toString() && value.tahun === t.toString();
                });
                $scope.bydate = _.chain($scope.match).uniq('tanggal').pluck('tanggal').sortBy().value();

                socket.syncUpdates('resep', $scope.match);
            });
        };
        $scope.getResep($scope.bulan, $scope.tahun);

        $scope.get = function (b, t) {
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getResep($scope.bulan, $scope.tahun);
        };

        $scope.deletemodal = function (data) {
            var scope = $scope.$new();
            scope.data = {
                id: data.id,
                lid: data.lid
            };
            var deletemodal = $modal({
                scope: scope,
                template: 'app/stok/resep/bpjs/daftar/template/deletemodal.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            deletemodal.$promise.then(deletemodal.show);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('resep');
        });

    });
