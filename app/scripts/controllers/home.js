'use strict';

angular.module('beerTrailApp')
    .controller('HomeCtrl', ['$scope', '$location', 'memberjson', 'storageService', 'analytics', function ($scope, $location, memberjson, storageService, analytics) {

        $scope.$emit('LOADING');

        //see if we have been here before
        var membershipListCache = storageService.get('vba-membership-cache');

        //if we have...
        if (membershipListCache != null) {
            $scope.memberList = membershipListCache;

            $scope.$emit('LOADED');
        } else { //if we have not

            //below pattern is for a service that returns a promise
            memberjson.getMemberData().then(function (data) {
                $scope.memberList = data;

                $scope.$emit('LOADED');

                var saveMe = data;
                storageService.save('vba-membership-cache', saveMe);

            });
        }; //end if-else

        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    }]);
