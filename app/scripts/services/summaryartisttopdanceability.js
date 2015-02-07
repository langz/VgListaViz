'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopDanceability
 * @description
 * # summaryArtistTopDanceability
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopDanceability', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopDanceability');
});
