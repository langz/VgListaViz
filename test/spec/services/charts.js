'use strict';

describe('Service: charts', function () {

  // load the service's module
  beforeEach(module('vgListaVizApp'));

  // instantiate service
  var charts;
  beforeEach(inject(function (_charts_) {
    charts = _charts_;
  }));

  it('should do something', function () {
    expect(!!charts).toBe(true);
  });

});
