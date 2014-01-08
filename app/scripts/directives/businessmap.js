'use strict';

angular.module('beerTrailApp')
    .directive('businessMap', ['$window', function ($window) {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                attrs.$observe('businessMap', function () {

                        //Massage Data
                        var latitude = attrs.businessMap.split(',')[0];
                        var longitude = attrs.businessMap.split(',')[1];
                        var lat = parseFloat(latitude);
                        var lon = parseFloat(longitude);


                        //Map Stuff
                        var myMapOptions, map, marker, infowindow;

                        myMapOptions = {
                            zoom: 10,
                            center: new google.maps.LatLng(lat, lon),
                            mapTypeControl: true,
                            mapTypeControlOptions: {
                                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                            },
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };

                        map = new google.maps.Map(element[0], myMapOptions);

                        marker = new google.maps.Marker ({
                            position: new google.maps.LatLng(lat, lon),
                            map: map
                        });

                        infowindow = new google.maps.InfoWindow ({
                            content: 'Zoom In To See The Location'
                        });

                        google.maps.event.addListener (marker, 'click' , function () {
                            infowindow.open(map, marker);
                        });

                }); //end observe
            } //end link function
        }; //end return
        analytics.logPageLoad($scope, $location.absUrl(), $location.path());
    }]);
