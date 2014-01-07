'use strict';

angular.module('beerTrailApp')
    .controller('DiningListCtrl', ['$scope', '$routeParams', '$filter', '$location', 'memberjson', 'storageService', 'diningService', 'analytics', function ($scope, $routeParams, $filter, $location, memberjson, storageService, diningService, analytics) {

        $scope.$emit('LOADING');

        //see if we are already in app or not
        var membershipListCache = storageService.get('vba-membership-cache');

        //if we are
        if (membershipListCache != null) {

            var member = ($filter('filter')(membershipListCache, {selector: $routeParams.selector}))[0];
            //publish
            $scope.member = member; //a.k.a. member.selector in ng-href

            //build stuff for diningService request
            var lat = member.latitude, lon = member.longitude;
            //build stuff for storageService request
            var cacheSelector = member.selector;
            var cacheKey = cacheSelector + '-' + 'dininglist-cache';

            //see if we have been here before
            var diningListCache = storageService.get(cacheKey);

            if (diningListCache != null) {

                //publish
                $scope.diningList = diningListCache.businesses;
                $scope.$emit('LOADED');
            } else {
                diningService.dininglist(lat, lon)
                    .success(function (diningData) {

                        //and publish
                        $scope.diningList = diningData.businesses;
                        $scope.$emit('LOADED');

                        //and save
                        var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'dininglist-cache';
                        var saveMe = diningData;
                        storageService.save(cacheKey, saveMe);
                    })
                    .error(function (diningData) {
                        alert('Uh oh :(. Tap the back button and try again. Criminal really, but it seems someone somewhere mis-poured a beer, and now we\'re all paying the price.');
                    });
            };
        } else {

            //so........ since we've never been here before, and by here I mean the app
            memberjson.getMemberData().then(function (data) {

                var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];

                //publish
                $scope.member = member; //tied to member.selector in ng-href

                //build stuff for diningService request
                var lat = member.latitude, lon = member.longitude;

                //go get it!
                diningService.dininglist(lat, lon)
                    .success(function (diningData) {
                        //and publish
                        $scope.diningList = diningData.businesses;
                        $scope.$emit('LOADED');

                        //and save...
                        var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'dininglist-cache';
                        var saveMe = diningData;
                        storageService.save(cacheKey, saveMe);
                    })
                    .error(function (diningData) {
                        alert('Uh oh :(. Tap the back button and try again. Criminal really, but it seems someone somewhere mis-poured a beer, and now we\'re all paying the price.');
                    });
            });

        }; //end if-else

        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    }]);