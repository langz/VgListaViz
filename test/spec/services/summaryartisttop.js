'use strict';

describe('Service: summaryArtistTop', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTop;
  beforeEach(inject(function (_summaryArtistTop_) {
    summaryArtistTop = _summaryArtistTop_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTop).toBe(true);
  });

});
