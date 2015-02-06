'use strict';

describe('Service: summaryArtistTopTimesignature', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopTimesignature;
  beforeEach(inject(function (_summaryArtistTopTimesignature_) {
    summaryArtistTopTimesignature = _summaryArtistTopTimesignature_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopTimesignature).toBe(true);
  });

});
