'use strict';

describe('Service: cacheservice', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var cacheservice;
  beforeEach(inject(function(_cacheservice_) {
    cacheservice = _cacheservice_;
  }));

  it('should do something', function () {
    expect(!!cacheservice).toBe(true);
  });

});
