'use strict';

describe('Service: summaryArtistTopDuration', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopDuration;
  beforeEach(inject(function (_summaryArtistTopDuration_) {
    summaryArtistTopDuration = _summaryArtistTopDuration_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopDuration).toBe(true);
  });

});
