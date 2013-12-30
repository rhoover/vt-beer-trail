'use strict';

angular.module('beerTrailApp')
    .factory('memberjson', ['$http', function ($http) {

        //below pattern is v1.2 with promises. yes!
        return {
            getMemberData: function () {
                return $http.get('data/vbamembership.json').then(function (result) {
                    return result.data;
                });
            }
        }
    }]);
