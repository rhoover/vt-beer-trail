'use strict';

describe('Service: weatherkey', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var weatherkey;
  beforeEach(inject(function(_weatherkey_) {
    weatherkey = _weatherkey_;
  }));

  it('should do something', function () {
    expect(!!weatherkey).toBe(true);
  });

});
