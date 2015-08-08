'use strict';

angular.module('kpmApp')
    .controller('RekamLineChartCtrl', function ($scope, Restangular) {

        var date = new Date();
        $scope.tahun = date.getFullYear();

        $scope.options = {
            bezierCurve: false
        };

        $scope.getData = function (d, t) {
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
                            jeniskelamin: chr._pasien.jeniskelamin,
                            did: chr.kontrol[i].did,
                            status: chr.kontrol[i].status
                        });
                    }
                });

                $scope.labels = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                $scope.datalength = [];
                $scope.count = 0;
                for (var i = 0; i < $scope.labels.length; i++) {
                    $scope.match = _.where($scope.temp, {
                        bulan: _.indexOf($scope.labels, $scope.labels[i]).toString(),
                        tahun: t.toString(),
                        did: d.toString()
                    });
                    $scope.datalength.push($scope.match.length);
                    $scope.count += $scope.match.length;
                }
                $scope.data = [$scope.datalength];

                Restangular.all('opsidiagnosas').customGETLIST().then(function (datas) {
                    $scope.diagnosas = datas;
                    $scope.header = _.chain($scope.diagnosas).where({
                        oid: d.toString()
                    }).pluck('opsi').value().join();
                    $scope.d.selected = $scope.diagnosas[d - 1];
                    $scope.series = [$scope.diagnosas[d - 1].opsi];
                });

            });
        };

        $scope.getData(1, $scope.tahun);

        $scope.d = {};
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);
        $scope.t = {
            selected: $scope.tahun
        };

        $scope.get = function (d, t) {
            $scope.getData(d.oid, t);
        };

        $scope.popup = function (d, t) {
            var left = screen.width / 2 - 400;
            var top = screen.height / 2 - 250;
            var url = '/api/kartukontrols/chart/linechart/' + d.oid + '/' + t;
            window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
        };

    });