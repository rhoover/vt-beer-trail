'use strict';

angular.module('beerTrailApp')
    .controller('MemberMapCtrl', ['$scope', '$routeParams', '$filter', '$location', 'memberjson', 'storageService', 'analytics', function ($scope, $routeParams, $filter, $location, memberjson, storageService, analytics) {

        $scope.$emit('LOADING');

        //see if we have been here before
        var memberMapCache = storageService.get('vba-membership-cache');
        if (memberMapCache != null) {
                var member = ($filter('filter')(memberMapCache, {selector: $routeParams.selector}))[0];
                $scope.member = member;

            $scope.$emit('LOADED');
        } else {

            //below pattern is for a service that returns a promise
            memberjson.getMemberData().then(function (data) {
                var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
                $scope.member = member;

                $scope.$emit('LOADED');

                var saveMe = data;
                storageService.save('vba-membership-cache', saveMe);

            });
        }; //end if-else

        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    }]);
