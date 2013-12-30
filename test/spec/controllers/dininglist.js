'use strict';

describe('Controller: DininglistCtrl', function () {

  // load the controller's module
  beforeEach(module('beerTrailApp'));

  var DininglistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DininglistCtrl = $controller('DininglistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
