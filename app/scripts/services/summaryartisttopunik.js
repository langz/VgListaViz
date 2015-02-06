'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopUnik
 * @description
 * # summaryArtistTopUnik
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopUnik', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopUnik');
});
