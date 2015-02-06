'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopDuration
 * @description
 * # summarySongTopDuration
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopDuration', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopDuration');
});
