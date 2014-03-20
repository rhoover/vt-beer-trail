'use strict';

angular.module('beerTrailApp')
  .controller('AllmemberMapCtrl', ['$scope', '$location', 'memberjson', 'storageService', 'analytics', function ($scope, $location, memberjson, storageService, analytics) {

        $scope.$emit('LOADING');

        //see if we have been here before
        var membershipCache = storageService.get('vba-membership-cache');
        if (membershipCache != null) {
            var members = membershipCache;
            $scope.members = members;

            $scope.$emit('LOADED');
        } else {

            //below pattern is for a service that returns a promise
            memberjson.getMemberData().then(function (data) {

            //pass off the heavy lifting to the filter
                $scope.member = appdataFilter(data, memberSelector);

                $scope.$emit('LOADED');

                var saveMe = data;
                storageService.save('vba-membership-cache', saveMe);

            });
        }; //end if-else

        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
  }]);
