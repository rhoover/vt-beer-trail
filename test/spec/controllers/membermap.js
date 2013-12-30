'use strict';

describe('Controller: MembermapCtrl', function () {

  // load the controller's module
  beforeEach(module('beerTrailApp'));

  var MembermapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MembermapCtrl = $controller('MembermapCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
