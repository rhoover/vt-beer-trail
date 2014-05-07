'use strict';

angular.module('beerTrailApp')
    .directive('allMemberMap', ['googleMap', function (googleMap) {
        return {
            restrict: 'A',
            compile: function (tElement, tAttributes, transclude) {
                return function (scope, element, attrs) {

                    //Map Stuff
                    var myMapOptions, map, marker, infoContent, infowindow, i;
                    var div = element[0];

                    myMapOptions = googleMap.mapOptions(7, 44.0407, -72.7093);

                    map= googleMap.mapCreator(div, myMapOptions);

                    for (i=0; i < scope.members.length; i++) {

                        var ml = scope.members[i];

                        marker = googleMap.mapMarker(map, ml.latitude, ml.longitude);

                        infoContent = '<p>'+ml.name+'</p>'+
                        '<p>'+ml.address+'</p>'+
                        '<p>'+ml.city+', '+ml.state+'</p>';

                        infowindow = googleMap.infoWindowCreator(infoContent);

                        googleMap.infoWindowsClick(map, marker, infowindow, infoContent);

                    } //end for loop
                } //end return function
            } //end compile
        } //end return
    }]);
