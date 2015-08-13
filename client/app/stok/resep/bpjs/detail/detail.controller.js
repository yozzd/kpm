'use strict';

angular.module('kpmApp')
    .controller('StokDetailBpjsCtrl', function ($scope, Restangular, $stateParams, $modal) {

        function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, {
                type: contentType
            });
            return blob;
        }

        $scope.getData = function () {
            Restangular.one('reseps').customGET($stateParams.id + '/' + $stateParams.lid).then(function (data) {
                $scope.data = data[0];
                $scope.blobUrl = !$scope.data.image ? '' : URL.createObjectURL(b64toBlob($scope.data.image, $scope.data.contenttype));
            });
        };

        $scope.getData();

        $scope.imgmodal = function (blobUrl) {
            var scope = $scope.$new();
            scope.data = {
                blobUrl: blobUrl
            };
            var imgmodal = $modal({
                scope: scope,
                template: 'app/stok/resep/bpjs/detail/template.html',
                show: false,
                animation: 'am-fade-and-slide-top'
            });
            imgmodal.$promise.then(imgmodal.show);
        };

    });
