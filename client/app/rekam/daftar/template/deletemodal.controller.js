'use strict';

angular.module('kpmApp')
    .controller('DeleteModalCtrl', function ($scope, Restangular, $alert) {

        $scope.delete = function (id) {
            Restangular.one('pasiens').customDELETE(id).then(function () {
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
