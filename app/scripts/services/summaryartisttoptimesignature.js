'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopTimesignature
 * @description
 * # summaryArtistTopTimesignature
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopTimesignature', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopTimesignature');
});
