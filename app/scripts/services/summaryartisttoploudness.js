'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopLoudness
 * @description
 * # summaryArtistTopLoudness
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopLoudness', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopLoudness');
});
