'use strict';

angular.module('kpmApp')
    .controller('DeleteModalResepBpjsCtrl', function ($scope, Restangular, $alert) {

        $scope.delete = function (id, lid) {
            Restangular.one('reseps').customDELETE(id + '/' + lid).then(function () {
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
