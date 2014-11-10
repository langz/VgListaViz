'use strict';

describe('Service: summary', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var summary;
  beforeEach(inject(function (_summary_) {
    summary = _summary_;
  }));

  it('should do something', function () {
    expect(!!summary).toBe(true);
  });

});
