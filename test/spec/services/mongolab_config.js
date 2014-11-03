'use strict';

describe('Service: MONGOLABCONFIG', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var MONGOLABCONFIG;
  beforeEach(inject(function (_MONGOLABCONFIG_) {
    MONGOLABCONFIG = _MONGOLABCONFIG_;
  }));

  it('should do something', function () {
    expect(!!MONGOLABCONFIG).toBe(true);
  });

});
