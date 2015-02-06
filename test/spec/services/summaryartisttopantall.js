'use strict';

describe('Service: summaryArtistTopAntall', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopAntall;
  beforeEach(inject(function (_summaryArtistTopAntall_) {
    summaryArtistTopAntall = _summaryArtistTopAntall_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopAntall).toBe(true);
  });

});
