'use strict';

describe('Service: summaryArtistTopLoudness', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopLoudness;
  beforeEach(inject(function (_summaryArtistTopLoudness_) {
    summaryArtistTopLoudness = _summaryArtistTopLoudness_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopLoudness).toBe(true);
  });

});
