'use strict';

describe('Service: diningservice', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var diningservice;
  beforeEach(inject(function(_diningservice_) {
    diningservice = _diningservice_;
  }));

  it('should do something', function () {
    expect(!!diningservice).toBe(true);
  });

});
