'use strict';

describe('Service: weatherservice', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var weatherservice;
  beforeEach(inject(function(_weatherservice_) {
    weatherservice = _weatherservice_;
  }));

  it('should do something', function () {
    expect(!!weatherservice).toBe(true);
  });

});
