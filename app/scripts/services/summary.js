'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summary
 * @description
 * # summary
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summary', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summary');
});
