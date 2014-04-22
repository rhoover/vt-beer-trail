'use strict';

angular.module('beerTrailApp')
    .directive('rhSkycons', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var canvas = element[0],
                    icon = attrs.rhSkycons,
                    skycons = new Skycons({'color': 'grey'});
                skycons.add(canvas, icon);
                skycons.play();
            }
        };
    });
