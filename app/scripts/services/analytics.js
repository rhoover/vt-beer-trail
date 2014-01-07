'use strict';

//inspired by, no, openly copied from:
//http://digitalturnip.com/angularjs-and-google-analytics-how-i-do-it/
angular.module('beerTrailApp')
    .factory('analytics', ['$window', function ($window) {

        // Public API here
        return {
            logPageLoad: function (scope, absoluteUrl, locationPath) {
                if (absoluteUrl.indexOf('beertrail.vermontbrewers.com') > 0) {
                    scope.$on('$viewContentLoaded', function (event) {
                        console.log('tracked!');
                        $window._gaq.push(['_trackPageview', locationPath])
                    });
                } else {
                    console.log('not tracked', locationPath);
                };
            }
        };
    }]);
