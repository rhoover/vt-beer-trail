'use strict';

angular.module('beerTrailApp')
    .directive('allMemberMap', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                //Map Stuff
                var myMapOptions, map;

                myMapOptions = {
                    zoom: 7,
                    center: new google.maps.LatLng(44.0407,-72.7093),
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                    },
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                map = new google.maps.Map(element[0], myMapOptions);
                var marker, i;

                for (i=0; i < scope.members.length; i++) {

                    var memberLocation = scope.members[i];
                    var pointer = new google.maps.LatLng(memberLocation.latitude, memberLocation.longitude);
                    var infowindow = new google.maps.InfoWindow();

                    marker = new google.maps.Marker({
                        position: pointer,
                        map: map,
                        title: memberLocation.name
                    });

                    var infoContent = '<p>'+memberLocation.name+'</p>'+
                    '<p>'+memberLocation.address+'</p>'+
                    '<p>'+memberLocation.city+', '+memberLocation.state+'</p>';

                    //Notice closure pattern, necessary for map with multiple markers
                    google.maps.event.addListener(marker, 'click', (function(marker, infoContent) {
                        return function() {
                            infowindow.setContent(infoContent);
                            infowindow.open(map, marker);
                        }
                    })(marker, infoContent));

                } //end for
            } //end link
        } //end return
    }]);
