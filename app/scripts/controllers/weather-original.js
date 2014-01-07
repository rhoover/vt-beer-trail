'use strict';

angular.module('beerTrailApp')
    .controller('WeatherCtrl', ['$scope', '$http', '$routeParams', '$filter', 'memberjson', 'storageService', 'weatherKey', function ($scope, $http, $routeParams, $filter, memberjson, storageService, weatherKey) {

        $scope.$emit('LOADING');

        //below pattern is for a service that consumes a promise
        memberjson.getMemberData().then(function (data) {

            //get specific member stuff
            var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
            $scope.member = member;

            //config specific member stuff for forecast url
            var lat = member.latitude, lon = member.longitude;

            //construct variables for storage service
            var cacheSelector = member.selector, storageCacheKey = cacheSelector + '-' + 'weather-cache';

            //see if we have been here before
           var weatherCache = storageService.get(storageCacheKey);

            if (weatherCache != null) {

                $scope.weatherInfo = weatherCache;
                var heat = weatherCache.currently.temperature;
                var apparentHeat = weatherCache.currently.apparentTemperature;
                var maxHeat = weatherCache.daily.data[2].temperatureMax;
                var precipPredict = weatherCache.currently.precipProbability*100;

                $scope.roundedTemp = Math.round(heat);
                $scope.roundedApparentTemp = Math.round(apparentHeat);
                $scope.roundedMaxTemp = Math.round(maxHeat);
                $scope.precipPredict = precipPredict;

                $scope.$emit('LOADED');

            } else {

                var url = 'https://api.forecast.io/forecast/' +
                                // 'f8f2554ef4616c5fe690247824dfa8ad/' +
                                weatherKey +
                                '/' +
                                lat +
                                ',' +
                                lon +
                                '?callback=JSON_CALLBACK';

                $http.jsonp(url)
                    .success(function (weatherData) {
                        $scope.weatherInfo = weatherData;

                        var heat = weatherData.currently.temperature;
                        var apparentHeat = weatherData.currently.apparentTemperature;
                        var maxHeat = weatherData.daily.data[2].temperatureMax;
                        var precipPredict = weatherData.currently.precipProbability*100;

                        $scope.roundedTemp = Math.round(heat);
                        $scope.roundedApparentTemp = Math.round(apparentHeat);
                        $scope.roundedMaxTemp = Math.round(maxHeat);
                        $scope.precipPredict = precipPredict;

                        $scope.$emit('LOADED');

                        var saveMe = weatherData;
                        storageService.save(storageCacheKey, saveMe);

                    })
                    .error(function (weatherData) {
                        alert("Rats! Looks like someone is trying to rain on your parade. Please try again!")
                    });

            }; //end weather if-else
        }); //end memberjson fetch
    }]);
