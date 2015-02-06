'use strict';

describe('Service: summarySongTopMode', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summarySongTopMode;
  beforeEach(inject(function (_summarySongTopMode_) {
    summarySongTopMode = _summarySongTopMode_;
  }));

  it('should do something', function () {
    expect(!!summarySongTopMode).toBe(true);
  });

});
