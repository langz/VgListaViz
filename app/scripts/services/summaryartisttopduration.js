'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopDuration
 * @description
 * # summaryArtistTopDuration
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopDuration', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopDuration');
});
