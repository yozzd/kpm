'use strict';

angular.module('kpmApp')
    .controller('RekamAnamnesaCtrl', function ($scope, Restangular, $stateParams, socket, $alert) {

        $scope.getData = function () {
            Restangular.one('anamnesas').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.nama = data._pasien.nama;
                $scope.batuk.selected = $scope.data.batuk === '' ? null : $scope.data.batuk;
                $scope.lamabatuk.selected1 = $scope.data.lamabatuk === '' ? null : $scope.data.lamabatuk.split(' ')[0];
                $scope.lamabatuk.selected2 = $scope.data.lamabatuk === '' ? null : $scope.data.lamabatuk.split(' ')[1];
                $scope.lamabatuk.selected3 = $scope.data.lamabatuk === '' ? null : $scope.data.lamabatuk.split(' ')[2];
                $scope.intensitasbatuk.selected = $scope.data.intensitasbatuk === '' ? null : $scope.data.intensitasbatuk;
                $scope.frekuensibatuk.selected = $scope.data.frekuensibatuk === '' ? null : $scope.data.frekuensibatuk;
                socket.syncUpdates('anamnesa', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                });
            });
        };

        $scope.getData();

        $scope.opt1 = ['Ya', 'Tidak'];
        $scope.opt2 = ['&lt;', '&ge;', '&plusmn;'];
        $scope.opt3 = ['minggu', 'bulan', 'tahun'];
        $scope.opt4 = ['Ringan', 'Berat'];
        $scope.opt5 = ['Jarang', 'Sering'];

        $scope.batuk = {};
        $scope.lamabatuk = {};
        $scope.intensitasbatuk = {};
        $scope.frekuensibatuk = {};

        $scope.clbatuk = function (x) {
            if (x === 'Tidak') {
                $scope.lamabatuk.selected1 = null;
                $scope.lamabatuk.selected2 = null;
                $scope.lamabatuk.selected3 = null;
                $scope.intensitasbatuk.selected = null;
                $scope.frekuensibatuk.selected = null;
            }
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('anamnesas').customPUT({
                    batuk: $scope.batuk.selected,
                    lamabatuk: $scope.batuk.selected === 'Tidak' ? '' : $scope.lamabatuk.selected1 + ' ' + $scope.lamabatuk.selected2 + ' ' + $scope.lamabatuk.selected3,
                    intensitasbatuk: $scope.batuk.selected === 'Tidak' ? '' : $scope.intensitasbatuk.selected,
                    frekuensibatuk: $scope.batuk.selected === 'Tidak' ? '' : $scope.frekuensibatuk.selected
                }, $scope.data._id).then(function () {
                    $alert({
                        content: 'Data sukses diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('anamnesa');
        });

    });
