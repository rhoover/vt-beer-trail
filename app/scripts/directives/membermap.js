'use strict';

angular.module('beerTrailApp')
    .directive('memberMap', [function () {

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                attrs.$observe('memberMap', function () {

                        //Massage Data
                        var latitude = attrs.memberMap.split(',')[0];
                        var longitude = attrs.memberMap.split(',')[1];
                        var lat = parseFloat(latitude);
                        var lon = parseFloat(longitude);

                        //Map Stuff
                        var myMapOptions, map, marker;

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

                }); //end observe
            } //end link function
        }; //end return
    }]);
