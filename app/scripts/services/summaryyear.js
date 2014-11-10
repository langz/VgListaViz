'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryYear
 * @description
 * # summaryYear
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryYear', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryYear');
});
