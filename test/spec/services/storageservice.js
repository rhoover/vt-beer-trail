'use strict';

describe('Service: storageservice', function () {

  // load the service's module
  beforeEach(module('beerTrailApp'));

  // instantiate service
  var storageservice;
  beforeEach(inject(function(_storageservice_) {
    storageservice = _storageservice_;
  }));

  it('should do something', function () {
    expect(!!storageservice).toBe(true);
  });

});
