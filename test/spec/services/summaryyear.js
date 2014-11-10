'use strict';

describe('Service: summaryYear', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summaryYear;
  beforeEach(inject(function (_summaryYear_) {
    summaryYear = _summaryYear_;
  }));

  it('should do something', function () {
    expect(!!summaryYear).toBe(true);
  });

});
