'use strict';

angular.module('beerTrailApp')
    .controller('DiningMapCtrl', ['$scope', '$routeParams', '$filter', '$location', 'storageService', 'analytics', function ($scope, $routeParams, $filter, $location, storageService, analytics) {

            $scope.$emit('LOADING');

            //construct variables for cache service
            var member = $routeParams.selector;
            var cacheKey = member + '-' + 'dininglist-cache';

            //get specified cache
            var gotCache = storageService.get(cacheKey);

            //filter for this particular business
            var gotBusiness = ($filter('filter')(gotCache.businesses, {id: $routeParams.id}))[0];

            //publish
            var phonenumber = gotBusiness.phone;
            $scope.diningmap = gotBusiness;
            $scope.formattedPhone = '(' + phonenumber.substr(0,3) + ')' + phonenumber.substr(3,3) + '-' + phonenumber.substr(6,4);

            $scope.$emit('LOADED');

            analytics.logPageLoad($scope, $location.absUrl(), $location.path());

    }]);
