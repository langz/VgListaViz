'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ChartCtrl
* @description
* # ChartCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ChartCtrl',function ($scope, $routeParams) {
  $scope.chartname = $routeParams.chartnavn;
});
