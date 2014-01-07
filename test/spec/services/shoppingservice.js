'use strict';

describe('Service: shoppingservice', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var shoppingservice;
  beforeEach(inject(function(_shoppingservice_) {
    shoppingservice = _shoppingservice_;
  }));

  it('should do something', function () {
    expect(!!shoppingservice).toBe(true);
  });

});
