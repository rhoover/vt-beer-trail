'use strict';

angular.module('beerTrailApp')
    .factory('diningService', ['$http', 'yelpKey', 'storageService', function ($http, yelpKey, storageService) {
        // Service logic
        var yelpUrl = 'https://api.yelp.com/business_review_search?' +
                'limit=20' +
                '&category=restaurants';

        var diningListRequest = function (lat, lon, yelpKey) {
            return $http({
                method: 'JSONP',
                url: yelpUrl +
                    '&lat=' + lat +
                    '&long=' + lon +
                    '&ywsid=' + yelpKey +
                    '&callback=JSON_CALLBACK'
            });
        };
        // Public API here
        return {
            dininglist: function (lat, lon) {
                return diningListRequest(lat, lon, yelpKey);
            }
        };
    }]);
