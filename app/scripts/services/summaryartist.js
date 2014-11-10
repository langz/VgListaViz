'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtist
 * @description
 * # summaryArtist
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtist', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtist');
});
