'use strict';

describe('Service: summaryDecade', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryDecade;
  beforeEach(inject(function (_summaryDecade_) {
    summaryDecade = _summaryDecade_;
  }));

  it('should do something', function () {
    expect(!!summaryDecade).toBe(true);
  });

});
