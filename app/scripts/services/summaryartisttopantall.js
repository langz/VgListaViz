'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopAntall
 * @description
 * # summaryArtistTopAntall
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopAntall', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopAntall');
});
