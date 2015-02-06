'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.summarySongTopLoudness
 * @description
 * # summarySongTopLoudness
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('summarySongTopLoudness', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('summarySongTopLoudness');
});
