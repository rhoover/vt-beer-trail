'use strict';

describe('Service: memberjson', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var memberjson;
  beforeEach(inject(function(_memberjson_) {
    memberjson = _memberjson_;
  }));

  it('should do something', function () {
    expect(!!memberjson).toBe(true);
  });

});
