'use strict';

// inspired by both:
// http://shahjadatalukdar.wordpress.com/2013/09/27/using-html5-localstorage-with-angularjs/
// http://jsfiddle.net/agrublev/QjVq3/

angular.module('beerTrailApp')
    .factory('storageService', [function () {
        // Service logic

        // Public API here
        return {
            get: function (key) {
                var value = sessionStorage.getItem(key);
                var parseMe = angular.fromJson(value);
                return parseMe;
            },
            save: function (key, data) {
                var storeMe = angular.toJson(data);
                sessionStorage.setItem(key, storeMe);
            },
            remove: function (key) {
                sessionStorage.removeItem(key);
            },
            clearAll: function () {
                sessionStorage.clear();
            }
        };
    }]);
