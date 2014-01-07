'use strict';

angular.module('beerTrailApp')
    .factory('weatherService', ['$http', 'weatherKey', function ($http, weatherKey) {

        // Service logic
        var weatherUrl = 'https://api.forecast.io/forecast/' + weatherKey;

        var weatherRequest = function (lat, lon) {
            return $http({
                method: 'JSONP',
                url: weatherUrl +
                    '/' +
                    lat +
                    ',' +
                    lon +
                    '?callback=JSON_CALLBACK'
            });
        };

        // Public API here
        return {
            weatherinfo: function (lat, lon) {
                return weatherRequest(lat, lon);
            }
        };
    }]);
