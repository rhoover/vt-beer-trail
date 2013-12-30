'use strict';

angular.module('beerTrailApp')
    .controller('MemberViewCtrl', ['$scope', '$routeParams', '$filter', 'memberjson', 'storageService', function ($scope, $routeParams, $filter, memberjson, storageService) {

        $scope.$emit('LOADING');

        //see if we have been here before
        var membershipViewCache = storageService.get('membership');
        if (membershipViewCache != null) {
                var member = ($filter('filter')(membershipViewCache, {selector: $routeParams.selector}))[0];
                $scope.member = member;

            $scope.$emit('LOADED');
        } else {

            //below pattern is for a service that returns a promise
            memberjson.getMemberData().then(function (data) {
                var member = ($filter('filter')(data, {selector: $routeParams.selector}))[0];
                $scope.member = member;

                $scope.$emit('LOADED');

                var saveMe = data;
                storageService.save('membership', saveMe);

            });
        }; //end if-else
    }]);
