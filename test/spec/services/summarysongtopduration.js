'use strict';

describe('Service: summarySongTopDuration', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopDuration;
  beforeEach(inject(function (_summarySongTopDuration_) {
    summarySongTopDuration = _summarySongTopDuration_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopDuration).toBe(true);
  });

});
