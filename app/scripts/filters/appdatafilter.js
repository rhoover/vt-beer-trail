'use strict';

angular.module('beerTrailApp')
    .filter('appdata', [function () {

        return {
            member: function (input, arg) { //input is membership json, arg1 is member.selector
                var outMember = [];
                for (var i=0; i<input.length; i++) {
                    if (input[i].selector === arg.selector) {
                        outMember.push(input[i]);
                        return outMember[0];
                    };
                }
            },
            business: function (input1, arg1) { //input1 is business cache, arg1 is business.name

                // courtesy of: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                var sorted1 = input1.sort(function (a, b) {
                    if (a.name > b.name)
                      return 1;
                    if (a.name < b.name)
                      return -1;
                    // a must be equal to b
                    return 0;
                });

                var outBusiness = [];
                for (var i=0; i<sorted1.length; i++) {
                    if (sorted1[i].id === arg1.id) {
                        outBusiness.push(sorted1[i]);
                        return outBusiness[0];
                    };
                }
            }
        } //end return
    }]);
