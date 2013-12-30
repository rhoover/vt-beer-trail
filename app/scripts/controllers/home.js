'use strict';

angular.module('beerTrailApp')
    .controller('HomeCtrl', ['$scope', 'memberjson', 'storageService', function ($scope, memberjson, storageService) {

        $scope.$emit('LOADING');

        //see if we have been here before
        var membershipListCache = storageService.get('membership');
        if (membershipListCache != null) {
            $scope.memberList = membershipListCache;

            $scope.$emit('LOADED');
        } else {

            //below pattern is for a service that returns a promise
            memberjson.getMemberData().then(function (data) {
                $scope.memberList = data;

                $scope.$emit('LOADED');

                var saveMe = data;
                storageService.save('membership', saveMe);

            });
        }; //end if-else
    }]);
