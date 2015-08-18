'use strict';

angular.module('kpmApp')
    .controller('DeleteModalObatCtrl', function ($scope, Restangular, $alert) {

        $scope.delete = function (id) {
            Restangular.one('obats').customDELETE(id).then(function () {
                $scope.$hide();
                $alert({
                    content: 'Data sukses dihapus',
                    placement: 'top-right',
                    type: 'danger',
                    duration: 5
                });
            });
        };

    });
