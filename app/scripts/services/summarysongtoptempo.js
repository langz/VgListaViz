'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopTempo
 * @description
 * # summarySongTopTempo
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopTempo', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopTempo');
});
