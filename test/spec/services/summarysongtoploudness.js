'use strict';

describe('Service: summarySongTopLoudness', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopLoudness;
  beforeEach(inject(function (_summarySongTopLoudness_) {
    summarySongTopLoudness = _summarySongTopLoudness_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopLoudness).toBe(true);
  });

});
