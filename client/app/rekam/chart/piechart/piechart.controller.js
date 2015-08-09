'use strict';

angular.module('kpmApp')
    .controller('RekamPieChartCtrl', function ($scope, Restangular) {

        var date = new Date();
        $scope.tahun = date.getFullYear();

        $scope.options = {
            tooltipEvents: [],
            showTooltips: true,
            tooltipFillColor: 'rgba(0,0,0,0.8)',
            tooltipYPadding: 4,
            tooltipXPadding: 4,
            tooltipCaretSize: 0,
            tooltipCornerRadius: 4,
            onAnimationComplete: function () {
                this.showTooltip(this.segments, true);
            }
        };

        $scope.getData = function (d, t) {
            Restangular.all('kartukontrols').customGETLIST().then(function (datas) {
                $scope.datas = datas;

                $scope.temp = [];
                _.map($scope.datas, function (chr) {
                    for (var i = 0; i < chr.kontrol.length; i++) {
                        $scope.temp.push({
                            bulan: chr.kontrol[i].bulan,
                            tahun: chr.kontrol[i].tahun,
                            umur: chr._pasien.umur,
                            jeniskelamin: chr._pasien.jeniskelamin,
                            did: chr.kontrol[i].did,
                            status: chr.kontrol[i].status
                        });
                    }
                });

                $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                $scope.datalength = [];
                $scope.count = 0;
                for (var i = 0; i < $scope.bulans.length; i++) {
                    $scope.match = _.where($scope.temp, {
                        bulan: _.indexOf($scope.bulans, $scope.bulans[i]).toString(),
                        tahun: t.toString(),
                        did: d.toString()
                    });
                    $scope.datalength.push({
                        count: $scope.match.length,
                        bulan: $scope.bulans[i]
                    });
                    $scope.count += $scope.match.length;
                }
                $scope.filter = _.filter($scope.datalength, function (v) {
                    return v.count > 0;
                });
                $scope.labels = _.pluck($scope.filter, 'bulan');
                $scope.data = _.pluck($scope.filter, 'count');

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
            var url = '/api/kartukontrols/chart/piechart/' + d.oid + '/' + t;
            window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
        };

    });
