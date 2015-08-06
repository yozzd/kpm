'use strict';

angular.module('kpmApp')
    .controller('RekamLaporanCtrl', function ($scope, Restangular, socket, $stateParams) {

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

        $scope.getData($scope.bulan, $scope.tahun, $stateParams.lid);

        $scope.laporans = ['TB Paru BTA Positif', 'TB Paru BTA Negatif', 'TB Paru Anak (Tersangka) Kelenjar', 'TB Paru Anak (Tersangka) Gizi Buruk', 'TB Paru Anak (Tersangka) Kontak', 'TB Ekstra Paru', 'ISPA Non Pneumonia Non Bronkhitis', 'ISPA Non Pneumonia Bronkhitis', 'ISPA Pneumonia < 5 Tahun', 'ISPA Pneumonia > 5 Tahun', 'Abces Paru', 'Empyema', 'Atelektasis', 'Pneumothoraks', 'Hydropneumothoraks', 'Asma Bronkhial', 'PPOK (Bronkhitis Kronik / Emfisema)', 'Cor Pulmonak Chonicum (CPC)', 'Tumor Paru', 'Tumor Mediastinum', 'Tumor Pleura', 'Trauma Thoraks', 'Penyakit Vascular Paru', 'Post TB Paru', 'Penyakit Paru / Saluran Napas Lainnya', 'Penyakit Non Paru / Non Saluran Napas Lainnya'];
        $scope.header = $scope.laporans[$stateParams.lid - 1];
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
            $scope.getData($scope.bulan, $scope.tahun, $stateParams.lid);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('kartukontrol');
        });

    });
