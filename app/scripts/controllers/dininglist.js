'use strict';

angular.module('beerTrailApp')
    .controller('DiningListCtrl', ['$scope', '$http', '$routeParams', '$filter', 'memberjson', 'storageService', 'yelpKey', function ($scope, $http, $routeParams, $filter, memberjson, storageService, yelpKey) {

        $scope.$emit('LOADING');

        //below pattern is for a service that consumes a promise
        memberjson.getMemberData().then(function (data) {

            //get specific member stuff
            var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
            $scope.member = member; //tied to member.selector in ng-href

            //config specific member stuff for yelp url
            var lat = member.latitude, lon = member.longitude;

            //construct variables for storage service
            var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'dininglist-cache';

            //see if we have been here before
           var diningListCache = storageService.get(cacheKey);

           if (diningListCache != null) {
                $scope.diningList = diningListCache.businesses;

                $scope.$emit('LOADED');
           } else {

                //send specific member stuff to yelp
                var url = 'https://api.yelp.com/business_review_search?' +
                    'limit=20' +
                    '&category=restaurants' +
                    '&lat=' + lat +
                    '&long=' + lon +
                    '&radius=5' +
                    '&ywsid=' + yelpKey +
                    '&callback=JSON_CALLBACK';
                $http.jsonp(url)
                    .success(function (diningData) {
                        $scope.diningList = diningData.businesses;

                        $scope.$emit('LOADED');

                        var saveMe = diningData;
                        storageService.save(cacheKey, saveMe);
                })
                    .error(function (diningData) {
                        alert('Uh oh :(. Tap the back button and try again. Criminal really, but it seems someone somewhere mis-poured a beer, and now we\'re all paying the price.');
                });

            }; //end else
        }); //end memberjson
    }]);