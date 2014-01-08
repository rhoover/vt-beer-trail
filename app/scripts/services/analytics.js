'use strict';

//inspired by, no, openly copied from:
//http://digitalturnip.com/angularjs-and-google-analytics-how-i-do-it/
angular.module('beerTrailApp')
    .factory('analytics', ['$window', function ($window) {

        // Public API here
        return {
            logPageLoad: function (scope, absoluteUrl, locationPath) {

                if (absoluteUrl.indexOf('beertrail.vermontbrewers') > 0) {
                    $window._gaq.push(['_trackPageview', locationPath]);
                    // scope.$on('$viewContentLoaded', function (event) {
                    //     $window._gaq.push(['_trackPageview', locationPath]);
                    //     console.log('tracked!');
                    // });
                } else {
                    console.log('URL not tracked:', locationPath);
                };
            }
        };
    }]);
