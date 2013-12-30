'use strict';

angular.module('beerTrailApp')
    .directive('navBar', [function () {
        return {
            restrict: 'A',
            templateUrl: 'navbar.html'
        };
    }]);
