'use strict';

describe('Service: summaryArtistTopUnik', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopUnik;
  beforeEach(inject(function (_summaryArtistTopUnik_) {
    summaryArtistTopUnik = _summaryArtistTopUnik_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopUnik).toBe(true);
  });

});
