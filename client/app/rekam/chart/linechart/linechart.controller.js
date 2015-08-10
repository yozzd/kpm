'use strict';

angular.module('kpmApp')
    .controller('RekamLineChartCtrl', function ($scope, Restangular) {

        var date = new Date();
        $scope.tahun = date.getFullYear();

        $scope.options = {
            bezierCurve: false,
            tooltipEvents: [],
            showTooltips: true,
            tooltipTemplate: '<%= value %>',
            tooltipFillColor: 'rgba(0,0,0,0)',
            tooltipFontColor: '#444',
            tooltipFontSize: 12,
            tooltipYPadding: 4,
            tooltipXPadding: 4,
            tooltipCaretSize: 0,
            tooltipCornerRadius: 4,
            onAnimationComplete: function () {
                this.showTooltip(this.datasets[0].points, true);
            }
        };

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        $scope.d = {};
        $scope.tahuns = _.range(2010, $scope.tahun + 1, 1);
        $scope.t = {
            selected: $scope.tahun
        };
        $scope.kelamins = [{
            str: 'All',
            val: 'All'
        }, {
            str: 'L',
            val: 'P'
        }, {
            str: 'P',
            val: 'L'
        }];
        $scope.k = {
            selected: {
                str: 'All',
                val: 'All'
            }
        };

        $scope.status = [{
            str: 'All',
            val: 'All'
        }, {
            str: 'B',
            val: 'L'
        }, {
            str: 'L',
            val: 'B'
        }];
        $scope.s = {
            selected: {
                str: 'All',
                val: 'All'
            }
        };

        $scope.getData = function (d, t, k, s) {
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

                $scope.datalength = [];
                $scope.count = 0;

                _.forEach($scope.bulans, function (val, key) {
                    $scope.filter = _.filter($scope.temp, function (v) {
                        return v.did === d.toString() && v.bulan === _.indexOf($scope.bulans, $scope.bulans[key]).toString() && v.tahun === t.toString() && v.jeniskelamin !== k && v.status !== s;
                    });
                    $scope.datalength.push($scope.filter.length);
                    $scope.count += $scope.filter.length;
                });

                $scope.data = [$scope.datalength];
                $scope.labels = $scope.bulans;

                Restangular.all('opsidiagnosas').customGETLIST().then(function (datas) {
                    $scope.diagnosas = datas;
                    $scope.header = _.chain($scope.diagnosas).where({
                        oid: d.toString()
                    }).pluck('opsi').value().join();
                    $scope.d.selected = $scope.diagnosas[d - 1];
                });

            });
        };

        $scope.getData(1, $scope.tahun, 'All', 'All');

        $scope.get = function (d, t, k, s) {
            $scope.getData(d.oid, t, k.val, s.val);
        };

        $scope.popup = function (d, t, k, s) {
            var left = screen.width / 2 - 400;
            var top = screen.height / 2 - 250;
            var url = '/api/kartukontrols/chart/linechart/' + d.oid + '/' + t + '/' + k.val + '/' + s.val;
            window.open(url, '', 'top=' + top + ',left=' + left + ',width=800,height=500');
        };

    });
