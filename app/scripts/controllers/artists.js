'use strict';

/**
 * @ngdoc function
 * @name vgListaVizApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the vgListaVizApp
 */
angular.module('vgListaVizApp')
  .controller('ArtistsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
