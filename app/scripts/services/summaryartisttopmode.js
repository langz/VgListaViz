'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summaryArtistTopMode
 * @description
 * # summaryArtistTopMode
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summaryArtistTopMode', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summaryArtistTopMode');
});
