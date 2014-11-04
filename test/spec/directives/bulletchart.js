'use strict';

describe('Directive: bulletChart', function () {

  // load the directive's module
  beforeEach(module('vgListaVizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bullet-chart></bullet-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bulletChart directive');
  }));
});
