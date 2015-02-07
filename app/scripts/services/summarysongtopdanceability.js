'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopDanceability
 * @description
 * # summarySongTopDanceability
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopDanceability', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopDanceability');
});
