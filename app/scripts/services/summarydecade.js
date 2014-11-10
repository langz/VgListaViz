'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryDecade
 * @description
 * # summaryDecade
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryDecade', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryDecade');
});
