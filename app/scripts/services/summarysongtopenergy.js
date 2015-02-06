'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopEnergy
 * @description
 * # summarySongTopEnergy
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopEnergy', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopEnergy');
});
