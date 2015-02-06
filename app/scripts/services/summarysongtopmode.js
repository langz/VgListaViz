'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopMode
 * @description
 * # summarySongTopMode
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopMode', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopMode');
});
