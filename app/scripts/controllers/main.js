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

  $scope.item = {};
  $scope.sizes = [
  {
    name:1,
    data:[1, 2, 3, 4, 5]
  },
  {
    name:2,
    data:[5, 4, 3, 2, 1]
  },
  {
    name:3,
    data:[12, 11, 1, 16, 8]
  }
  ];

  $scope.update = function(){
    $scope.try.series = [{data: $scope.item.data}];
  };
  $scope.try = {
    options: {
      chart: {
        type: 'line'
      }
    },
    series: [{
      data: [10, 15, 12, 8, 7]
    }],
    title: {
      text: 'Hello'
    },

    loading: false
  }
});
