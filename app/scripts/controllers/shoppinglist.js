'use strict';

angular.module('beerTrailApp')
    .controller('ShoppingListCtrl', ['$scope', '$routeParams', '$filter', 'memberjson', 'storageService', 'shoppingService', function ($scope, $routeParams, $filter, memberjson, storageService, shoppingService) {

        $scope.$emit('LOADING');

        //see if we are already in app or not
        var membershipListCache = storageService.get('vba-membership-cache');

        //if we are
        if (membershipListCache != null) {

            var member = ($filter('filter')(membershipListCache, {selector: $routeParams.selector}))[0];
            //publish
            $scope.member = member; //a.k.a. member.selector in ng-href

            //build stuff for shoppingService request
            var lat = member.latitude, lon = member.longitude;
            //build stuff for storageService request
            var cacheSelector = member.selector;
            var cacheKey = cacheSelector + '-' + 'shoppinglist-cache';

            //see if we have been here before
            var shoppingListCache = storageService.get(cacheKey);

            if (shoppingListCache != null) {
                //publish
                $scope.shoppingList = shoppingListCache.businesses;
                $scope.$emit('LOADED');
            } else {
                shoppingService.shoppinglist(lat, lon)
                .success(function (shoppingData) {
                    //and publish
                    $scope.shoppingList = shoppingData.businesses;
                    $scope.$emit('LOADED');

                    //and save
                    var saveMe = shoppingData;
                    storageService.save(cacheKey, saveMe);
                })
                .error(function (shoppingData) {
                    alert('Uh oh :(. Tap the back button and try again. Criminal really, but it seems someone somewhere mis-poured a beer, and now we\'re all paying the price.');
                });
            };
        } else {
            //so........ since we've never been here before, and by here I mean the app
            memberjson.getMemberData().then(function (data) {

                var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];

                //publish
                $scope.member = member; //tied to member.selector in ng-href

                //build stuff for shoppingService request
                var lat = member.latitude, lon = member.longitude;

                //go get it!
                shoppingService.shoppinglist(lat, lon)
                    .success(function (shoppingData) {
                        //and publish
                        $scope.shoppingList = shoppingData.businesses;
                        $scope.$emit('LOADED');

                        //and save...
                        var cacheSelector = member.selector, cacheKey = cacheSelector + '-' + 'shoppinglist-cache';
                        var saveMe = shoppingData;
                        storageService.save(cacheKey, saveMe);
                    })
                    .error(function (shoppingData) {
                        alert('Uh oh :(. Tap the back button and try again. Criminal really, but it seems someone somewhere mis-poured a beer, and now we\'re all paying the price.');
                    });
            });

        }; //end if-else
    }]);