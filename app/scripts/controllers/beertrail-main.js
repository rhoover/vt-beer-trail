'use strict';

angular.module('beerTrailApp')
    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.$on('LOADING', function () {
            $scope.loading = true;
        });
        $scope.$on('LOADED', function () {
            $scope.loading = false;
        });

    }]);
