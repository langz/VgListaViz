'use strict';

/**
* @ngdoc service
* @name vgListaVizApp.summaryArtistTop
* @description
* # summaryArtistTop
* Factory in the vgListaVizApp.
*/
angular.module('vgListaVizApp')
.factory('summaryArtistTopAntall', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopAntall');
});
