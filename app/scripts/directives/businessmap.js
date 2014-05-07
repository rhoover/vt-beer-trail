'use strict';

angular.module('beerTrailApp')
    .directive('businessMap', ['googleMap', function (googleMap) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                    //Massage Data
                    var latitude = attrs.businessMap.split(',')[0];
                    var longitude = attrs.businessMap.split(',')[1];
                    var lat = parseFloat(latitude);
                    var lon = parseFloat(longitude);

                    //Map Stuff
                    var myMapOptions, map, marker, infoContent, infowindow;
                    var div = element[0];

                    myMapOptions = googleMap.mapOptions(10, lat, lon);

                    map= googleMap.mapCreator(div, myMapOptions);

                    marker = googleMap.mapMarker(map, lat, lon);

                    infoContent = 'Zoom In To See The Location';

                    infowindow = googleMap.infoWindowCreator(infoContent);

                    googleMap.infoWindowClick(map, marker, infowindow);

            } //end link function
        }; //end return
    }]);
