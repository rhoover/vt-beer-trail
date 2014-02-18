'use strict';

angular.module('beerTrailApp')
    .controller('MemberMapCtrl', ['$scope', '$routeParams', '$location', 'memberjson', 'storageService', 'analytics', 'appdataFilter', function ($scope, $routeParams, $location, memberjson, storageService, analytics, appdataFilter) {

        $scope.$emit('LOADING');

        //see if we have been here before
        var membershipCache = storageService.get('vba-membership-cache');
        if (membershipCache != null) {
            // var member = ($filter('filter')(memberCache, {selector: $routeParams.selector}))[0];
            // $scope.member = member;
            var memberSelector = {selector: $routeParams.selector};
            var member = appdataFilter.member(membershipCache, memberSelector);
            $scope.member = member;

            $scope.$emit('LOADED');
        } else {

            //below pattern is for a service that returns a promise
            memberjson.getMemberData().then(function (data) {

                // var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
                // $scope.member = member;
                $scope.member = appdataFilter(data, memberSelector);

                $scope.$emit('LOADED');

                var saveMe = data;
                storageService.save('vba-membership-cache', saveMe);

            });
        }; //end if-else

        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    }]);
