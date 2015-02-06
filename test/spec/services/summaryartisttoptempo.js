'use strict';

describe('Service: summaryArtistTopTempo', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopTempo;
  beforeEach(inject(function (_summaryArtistTopTempo_) {
    summaryArtistTopTempo = _summaryArtistTopTempo_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopTempo).toBe(true);
  });

});
