'use strict';

/**
* @ngdoc service
* @name vgListaVizApp.summaryArtistTop
* @description
* # summaryArtistTop
* Factory in the vgListaVizApp.
*/
angular.module('vgListaVizApp')
.factory('summaryArtistTop', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTop');
});
