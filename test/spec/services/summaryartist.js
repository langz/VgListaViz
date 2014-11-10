'use strict';

describe('Service: summaryArtist', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryArtist;
  beforeEach(inject(function (_summaryArtist_) {
    summaryArtist = _summaryArtist_;
  }));

  it('should do something', function () {
    expect(!!summaryArtist).toBe(true);
  });

});
