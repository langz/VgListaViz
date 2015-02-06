'use strict';

describe('Service: summarySongTopAntall', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopAntall;
  beforeEach(inject(function (_summarySongTopAntall_) {
    summarySongTopAntall = _summarySongTopAntall_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopAntall).toBe(true);
  });

});
