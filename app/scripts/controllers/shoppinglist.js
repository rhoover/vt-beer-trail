'use strict';

angular.module('beerTrailApp')
    .controller('ShoppingListCtrl', ['$scope', '$http', '$routeParams', '$filter', 'memberjson', 'storageService', 'yelpKey', function ($scope, $http, $routeParams, $filter, memberjson, storageService, yelpKey) {

        $scope.$emit('LOADING');

        //below pattern is for a service that consumes a promise
        memberjson.getMemberData().then(function (data) {

            //get specific member stuff
            var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
            $scope.member = member;

            //config specific member stuff for yelp url
            var lat = member.latitude, lon = member.longitude;

            //construct variables for storage service
            var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'shoppinglist-cache';

            //see if we have been here before
           var shoppingListCache = storageService.get(cacheKey);

           if (shoppingListCache != null) {
                $scope.shoppingList = shoppingListCache.businesses;

                $scope.$emit('LOADED');
           } else {

                var url = 'https://api.yelp.com/business_review_search?' +
                    'limit=20' +
                    '&category=shopping+arts+active+localservices+localflavor+food+tours+auto' +
                    '&lat=' + lat +
                    '&long=' + lon +
                    '&radius=5' +
                    '&ywsid=' + yelpKey +
                    '&callback=JSON_CALLBACK';
                $http.jsonp(url) //no angular native caching for jsonp, callback changes url each time
                    .success(function (shoppingData) {
                        $scope.shoppingList = shoppingData.businesses;

                        $scope.$emit('LOADED');

                        var saveMe = shoppingData;
                        storageService.save(cacheKey, saveMe);
                })
                    .error(function (shoppingData) {
                        alert('Uh oh :(. Tap the back button and try again. Criminal really, but it seems someone somewhere mis-poured a beer, and now we\'re all paying the price.');
                });

            } //end else
        }); //end memberjson
    }]);