'use strict';

describe('Directive: membermap', function () {

  // load the directive's module
  beforeEach(module('beerTrailApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<membermap></membermap>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the membermap directive');
  }));
});
