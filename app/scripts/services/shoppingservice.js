'use strict';

angular.module('beerTrailApp')
    .factory('shoppingService', ['$http', 'yelpKey', function ($http, yelpKey) {
        // Service logic
        var yelpUrl = 'https://api.yelp.com/business_review_search?' +
                'limit=20' +
                '&category=shopping+arts+active+localservices+localflavor+food+tours+auto';

        var shoppingListRequest = function (lat, lon, yelpKey) {
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
            shoppinglist: function (lat, lon) {
                return shoppingListRequest(lat, lon, yelpKey);
            }
        };
    }]);
