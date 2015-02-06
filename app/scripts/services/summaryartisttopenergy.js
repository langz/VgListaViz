'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopEnergy
 * @description
 * # summaryArtistTopEnergy
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopEnergy', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopEnergy');
});
