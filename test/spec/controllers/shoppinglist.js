'use strict';

describe('Controller: ShoppinglistCtrl', function () {

  // load the controller's module
  beforeEach(module('beerTrailApp'));

  var ShoppinglistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShoppinglistCtrl = $controller('ShoppinglistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
