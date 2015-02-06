'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopAntall
 * @description
 * # summarySongTopAntall
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopAntall', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopAntall');
});
