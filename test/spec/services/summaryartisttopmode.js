'use strict';

describe('Service: summaryArtistTopMode', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtistTopMode;
  beforeEach(inject(function (_summaryArtistTopMode_) {
    summaryArtistTopMode = _summaryArtistTopMode_;
  }));

  it('should do something', function () {
    expect(!!summaryArtistTopMode).toBe(true);
  });

});
