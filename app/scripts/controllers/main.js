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

    $scope.data = [
      {name: "Greg", score: 9},
      {name: "Ari", score: 2},
      {name: 'Q', score: 6},
      {name: "Loser", score: 1}
    ];
$scope.myData = [
    {name: 'AngularJS', count: 300},
    {name: 'D3.JS', count: 150},
    {name: 'jQuery', count: 400},
    {name: 'Backbone.js', count: 300},
    {name: 'Ember.js', count: 100}
];
});
