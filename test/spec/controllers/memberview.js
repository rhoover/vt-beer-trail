'use strict';

describe('Controller: MemberviewCtrl', function () {

  // load the controller's module
  beforeEach(module('beerTrailApp'));

  var MemberviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MemberviewCtrl = $controller('MemberviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
