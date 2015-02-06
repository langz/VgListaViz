'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopTimesignature
 * @description
 * # summarySongTopTimesignature
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopTimesignature', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopTimesignature');
});
