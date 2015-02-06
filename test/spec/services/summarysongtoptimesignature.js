'use strict';

describe('Service: summarySongTopTimesignature', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopTimesignature;
  beforeEach(inject(function (_summarySongTopTimesignature_) {
    summarySongTopTimesignature = _summarySongTopTimesignature_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopTimesignature).toBe(true);
  });

});
