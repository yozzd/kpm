'use strict';

angular.module('kpmApp')
    .controller('RekamParuPositifCtrl', function ($scope, Restangular, $stateParams, socket) {

        $scope.getData = function () {
            Restangular.all('kartukontrols').customGETLIST().then(function (datas) {
                $scope.datas = datas;

                $scope.temp = [];
                _.map($scope.datas, function (chr) {
                    for (var i = 0; i < chr.kontrol.length; i++) {
                        $scope.temp.push({
                            tanggal: chr.kontrol[i].tanggal,
                            nama: chr._pasien.nama,
                            umur: chr._pasien.umur,
                            did: chr.kontrol[i].did
                        });
                    }
                });
                $scope.match = _.where($scope.temp, {
                    did: '1'
                });
                $scope.bydate = _.pluck(_.uniq($scope.match, 'tanggal'), 'tanggal');

                socket.syncUpdates('kartukontrol', $scope.datas);
            });
        };

        $scope.getData();

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('kartukontrol');
        });

    });
