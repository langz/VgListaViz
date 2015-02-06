'use strict';

describe('Service: summaryArtistTopEnergy', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopEnergy;
  beforeEach(inject(function (_summaryArtistTopEnergy_) {
    summaryArtistTopEnergy = _summaryArtistTopEnergy_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopEnergy).toBe(true);
  });

});
