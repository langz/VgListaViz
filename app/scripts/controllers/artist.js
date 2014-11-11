'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistCtrl
* @description
* # ArtistCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistCtrl', function ($scope, $routeParams) {
  $scope.artistName = $routeParams.artistnavn;
});
