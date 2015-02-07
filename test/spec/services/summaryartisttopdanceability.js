'use strict';

describe('Service: summaryArtistTopDanceability', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopDanceability;
  beforeEach(inject(function (_summaryArtistTopDanceability_) {
    summaryArtistTopDanceability = _summaryArtistTopDanceability_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopDanceability).toBe(true);
  });

});
