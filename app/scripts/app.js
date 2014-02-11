'use strict';

angular.module('beerTrailApp', ['ngRoute', 'ngAnimate']) //, 'ngTouch'
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/:selector', {
                templateUrl: 'memberview.html'
            })
            .when('/:selector/location', {
                templateUrl: 'membermap.html'
            })
            .when('/:selector/shoppinglist', {
                templateUrl: 'shoppinglist.html'
            })
            .when('/:selector/dininglist', {
                templateUrl: 'dininglist.html'
            })
            .when('/:selector/dininglist/:id', {
                templateUrl: 'diningmap.html'
            })
            .when('/:selector/shoppinglist/:id', {
                templateUrl: 'shoppingmap.html'
            })
            .when('/:selector/weather', {
                templateUrl: 'weather.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .run(function () {
        FastClick.attach(document.body);
    });
