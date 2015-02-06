'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopTempo
 * @description
 * # summaryArtistTopTempo
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopTempo', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopTempo');
});
