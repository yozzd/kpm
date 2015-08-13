'use strict';

angular.module('kpmApp')
    .controller('RekamLaporanCtrl', function ($scope, Restangular, socket, $stateParams) {

        $scope.lid = $stateParams.lid;

        var date = new Date();
        $scope.bulan = date.getMonth();
        $scope.tahun = date.getFullYear();

        $scope.getData = function (b, t, lid) {
            Restangular.all('kartukontrols').customGETLIST().then(function (datas) {
                $scope.datas = datas;

                $scope.temp = [];
                _.map($scope.datas, function (chr) {
                    for (var i = 0; i < chr.kontrol.length; i++) {
                        $scope.temp.push({
                            id: chr._pasien._id,
                            tanggal: chr.kontrol[i].tanggal,
                            bulan: chr.kontrol[i].bulan,
                            tahun: chr.kontrol[i].tahun,
                            nama: chr._pasien.nama,
                            umur: chr._pasien.umur,
                            satuanumur: chr._pasien.satuanumur,
                            jeniskelamin: chr._pasien.jeniskelamin,
                            did: chr.kontrol[i].did,
                            status: chr.kontrol[i].status
                        });
                    }
                });
                $scope.match = _.where($scope.temp, {
                    did: lid.toString(),
                    bulan: b.toString(),
                    tahun: t.toString()
                });
                $scope.bydate = _.chain($scope.match).uniq('tanggal').pluck('tanggal').sortBy().value();

                socket.syncUpdates('kartukontrol', $scope.datas);
            });
        };

        $scope.getData($scope.bulan, $scope.tahun, $scope.lid);

        Restangular.all('opsidiagnosas').customGETLIST().then(function (datas) {
            $scope.laporans = datas;
            $scope.header = _.chain($scope.laporans).where({
                oid: $scope.lid.toString()
            }).pluck('opsi').value().join();
        });

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);
        $scope.b = {
            selected: $scope.bulans[$scope.bulan]
        };
        $scope.t = {
            selected: $scope.tahun
        };

        $scope.get = function (b, t) {
            $scope.bulan = _.indexOf($scope.bulans, b);
            $scope.tahun = t;
            $scope.getData($scope.bulan, $scope.tahun, $scope.lid);
        };

        $scope.popup = function (a, b, c) {
            var left = screen.width / 2 - 400;
            var top = screen.height / 2 - 250;
            var url = '/api/kartukontrols/cetak/' + a + '/' + b + '/' + c;
            window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('kartukontrol');
        });

    });
