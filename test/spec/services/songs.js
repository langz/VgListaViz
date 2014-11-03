'use strict';

describe('Service: songs', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var songs;
  beforeEach(inject(function (_songs_) {
    songs = _songs_;
  }));

  it('should do something', function () {
    expect(!!songs).toBe(true);
  });

});
