'use strict';

describe('Service: summarySongTopEnergy', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopEnergy;
  beforeEach(inject(function (_summarySongTopEnergy_) {
    summarySongTopEnergy = _summarySongTopEnergy_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopEnergy).toBe(true);
  });

});
