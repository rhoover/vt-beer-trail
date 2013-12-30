'use strict';

describe('Controller: DiningviewCtrl', function () {

  // load the controller's module
  beforeEach(module('beerTrailApp'));

  var DiningviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiningviewCtrl = $controller('DiningviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
