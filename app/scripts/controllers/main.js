'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('MainCtrl', function ($scope, charts, songs) {
  // charts.query({"year": "1960"}).then(function(s){
  //   $scope.charts = s;
  //   console.log($scope.charts);
  // });
// charts.query({ list: { $elemMatch: {"artist": "Emile Ford"} } }).then(function(s){
//   $scope.charts = s;
//   console.log($scope.charts);
// });

  // songs.all({ limit: 10000 }).then(function(s){
  //   $scope.songs = s;
  //   console.log($scope.songs);
  // });
});
