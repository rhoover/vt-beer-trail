'use strict';

describe('Service: yelpkey', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var yelpkey;
  beforeEach(inject(function(_yelpkey_) {
    yelpkey = _yelpkey_;
  }));

  it('should do something', function () {
    expect(!!yelpkey).toBe(true);
  });

});
