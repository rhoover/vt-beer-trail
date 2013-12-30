'use strict';

describe('Controller: ShoppingmapCtrl', function () {

  // load the controller's module
  beforeEach(module('beerTrailApp'));

  var ShoppingmapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShoppingmapCtrl = $controller('ShoppingmapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
