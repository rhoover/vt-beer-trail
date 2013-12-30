'use strict';

// leaving this here for reference purposes
//it is not being cat'd by Grunt build
angular.module('beerTrailApp')
    .factory('cacheService', ['$http', 'storageService', function ($http, storageService) {
        // Service logic

        // Public API here
        return {
            getData: function (key) {
                return storageService.get(key);
            },
            setData: function (key, data) {
                storageService.save(key, data);
            },
            removeData: function (key) {
                storageService.remove(key);
            },
            clearData: function () {
                storageService.clearAll();
            }
        };
    }]);
