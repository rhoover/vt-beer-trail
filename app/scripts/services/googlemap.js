'use strict';

angular.module('beerTrailApp')
    .service('googleMap', [function () {

        return {
            mapOptions: function (zoom, lat, lon) {
                var mapOptionsStuff;
                mapOptionsStuff = {
                    zoom: zoom,
                    center: new google.maps.LatLng(lat, lon),
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                return mapOptionsStuff;
            },
            mapCreator: function (div, myMapOptions) {
                var mapCreatorStuff;
                mapCreatorStuff = new google.maps.Map(div, myMapOptions);
                return mapCreatorStuff;
            },
            mapMarker: function (map, lat, lon) {
                var markerStuff;
                markerStuff = new google.maps.Marker ({
                    position: new google.maps.LatLng(lat, lon),
                    map: map
                });
                return markerStuff;
            },
            infoWindowCreator: function (infoContent) {
                var infoWindowStuff;
                infoWindowStuff = new google.maps.InfoWindow({
                    content: infoContent
                });
                return infoWindowStuff;
            },
            infoWindowClick: function (map, marker, infowindow) {
                var clickEventStuff;
                clickEventStuff = google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
                return clickEventStuff;
            },
            infoWindowsClick: function (map, marker, infowindow, infoContent) {
                var multipleClickEventStuff;
                //Notice closure pattern, necessary for map with multiple markers
                multipleClickEventStuff = google.maps.event.addListener(marker, 'click', (function (marker, infoContent) {
                        return function () {
                            infowindow.setContent(infoContent);
                            infowindow.open(map, marker);
                        }
                    })(marker, infoContent));
                return multipleClickEventStuff;
            }
        };
    }]);
