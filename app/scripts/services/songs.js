'use strict';

/**
* @ngdoc service
* @name vgListaVizApp.songs
* @description
* # songs
* Factory in the vgListaVizApp.
*/
angular.module('vgListaVizApp')
.factory('songs', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('songs');
});
