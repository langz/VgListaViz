'use strict';

describe('Service: summarySongTopTempo', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopTempo;
  beforeEach(inject(function (_summarySongTopTempo_) {
    summarySongTopTempo = _summarySongTopTempo_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopTempo).toBe(true);
  });

});
