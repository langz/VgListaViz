'use strict';

describe('Service: summarySongTopDanceability', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopDanceability;
  beforeEach(inject(function (_summarySongTopDanceability_) {
    summarySongTopDanceability = _summarySongTopDanceability_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopDanceability).toBe(true);
  });

});
