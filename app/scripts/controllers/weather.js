'use strict';

angular.module('beerTrailApp')
    .controller('WeatherCtrl', ['$scope', '$routeParams', '$location', 'memberjson', 'storageService', 'weatherService', 'analytics', 'appdataFilter', function ($scope, $routeParams, $location, memberjson, storageService, weatherService, analytics, appdataFilter) {

        $scope.$emit('LOADING');

        //see if we are already in app or not
        var membershipCache = storageService.get('vba-membership-cache');

        //if we are
        if (membershipCache != null) {

            // var member = ($filter('filter')(membershipCache, {selector: $routeParams.selector}))[0];
            // $scope.member = member; //a.k.a. member.selector in ng-href

            //publish
            var memberSelector = {selector: $routeParams.selector};
            var member = appdataFilter.member(membershipCache, memberSelector);
            $scope.member = member;

            //build stuff for weatherService request
            var lat = member.latitude, lon = member.longitude;

            //build stuff for storageService request
            var cacheSelector = member.selector;
            var cacheKey = cacheSelector + '-' + 'weather-cache';

            //see if we have been here before
            var weatherCache = storageService.get(cacheKey);

            if (weatherCache != null) {

                //publish
                $scope.weatherInfo = weatherCache;

                $scope.roundedTemp = Math.round(weatherCache.currently.temperature);
                $scope.roundedApparentTemp = Math.round(weatherCache.currently.apparentTemperature);
                $scope.roundedMaxTemp = Math.round(weatherCache.daily.data[2].temperatureMax);
                $scope.precipPredict = weatherCache.currently.precipProbability*100;

                $scope.$emit('LOADED');
            } else {
                weatherService.weatherinfo(lat, lon)
                    .success(function (weatherData) {

                        //and publish
                        $scope.weatherInfo = weatherData;

                        $scope.roundedTemp = Math.round(weatherData.currently.temperature);
                        $scope.roundedApparentTemp = Math.round(weatherData.currently.apparentTemperature);
                        $scope.roundedMaxTemp = Math.round(weatherData.daily.data[2].temperatureMax);
                        $scope.precipPredict = weatherData.currently.precipProbability*100;

                        $scope.$emit('LOADED');

                        //and save
                        var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'weather-cache';
                        var saveMe = weatherData;
                        storageService.save(cacheKey, saveMe);
                    })
                    .error(function (weatherData) {
                        alert("Rats! Looks like someone is trying to rain on your parade. Please try again!")
                    });
            };
        } else {

            //so....... since we've never been here before, and by here I mean the app
            memberjson.getMemberData().then(function (data) {

                // var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
                // $scope.member = member; //tied to member.selector in ng-href

                //publish
                var memberSelector = {selector: $routeParams.selector};
                var member = appdataFilter.member(membershipCache, memberSelector);
                $scope.member = member;

                //build stuff for weatherService request
                var lat = member.latitude, lon = member.longitude;

                //go get it!
                weatherService.weatherinfo(lat, lon)
                    .success(function (weatherData) {

                        //and publish
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

                        //and save
                        var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'weather-cache';
                        var saveMe = weatherData;
                        storageService.save(cacheKey, saveMe);
                    })
                    .error(function (weatherData) {
                        alert("Rats! Looks like someone is trying to rain on your parade. Please try again!")
                    });

            });
        };

        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    }]);
