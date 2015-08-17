'use strict';

angular.module('kpmApp')
    .controller('StokEditObatCtrl', function ($scope, Restangular, socket, $alert, $stateParams) {

        $scope.bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        $scope.getData = function () {
            Restangular.one('obats').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.b = {
                    selected: $scope.bulans[$scope.data.bulan]
                };
                $scope.t = {
                    selected: $scope.data.tahun
                };
                $scope.obat = {
                    selected: {
                        nama: $scope.data.obat
                    }
                };
                $scope.satuan = $scope.data.satuan;
            });
        };

        $scope.getData();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('obats').customPUT($scope.data, $stateParams.id).then(function () {
                    $alert({
                        content: 'Data sukses diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

    });
