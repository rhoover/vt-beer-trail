'use strict';

angular.module('beerTrailApp')
    .controller('DiningMapCtrl', ['$scope', '$routeParams', '$location',  'storageService', 'analytics', 'appdataFilter', function ($scope, $routeParams, $location, storageService, analytics, appdataFilter) {

            $scope.$emit('LOADING');

            //construct variables for cache service
            var member = $routeParams.selector;
            var cacheKey = member + '-' + 'dininglist-cache';

            //get specified cache
            var gotCache = storageService.get(cacheKey).businesses;

            //filter for this particular business
            var businessId = {id: $routeParams.id};
            var gotBusiness = appdataFilter.business(gotCache, businessId);
            // var gotBusiness = ($filter('filter')(gotCache, {id: $routeParams.id}))[0];

            //publish
            var phonenumber = gotBusiness.phone;
            $scope.diningmap = gotBusiness;
            $scope.formattedPhone = '(' + phonenumber.substr(0,3) + ')' + phonenumber.substr(3,3) + '-' + phonenumber.substr(6,4);

            $scope.$emit('LOADED');

            analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    }]);
