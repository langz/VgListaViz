'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('MainCtrl', function ($scope, charts, songs, summaryDecade) {
  $scope.one=1;
  $scope.maxSize = 5;
  $scope.maxSize2 = 7;
  $scope.years = 2014;
  $scope.year = 1960;

  $scope.weeks = 53;
  $scope.week = 1;
  $scope.myStyle = {'min-height':'365px'};
  $scope.produceChart = function(year, week){
    charts.query({ $and: [{"year": ""+year+""}, {"week": "Uke " +week}]}).then(function(res){
      if(res.length===0){
        alert('Det er dessverre ikke publisert noen liste for denne uken');
      }
      else{
        console.log(res)
        if(res[0].list.length===20){
          $scope.myStyle = {'min-height':'700px'};
        }
        else{
          $scope.myStyle = {'min-height':'365px'};
        }
        $scope.chart = res[0];
      }

    });

  };
  $scope.getChart = function(){
    return $scope.chart;
  }
  $scope.changePagination = function(){
    $scope.chart = {};
    if($scope.year < 1960){
      $scope.year=1960;
      console.log('Det finnes dessverre ikke data for år < 1960')
    }
    else{
      $scope.produceChart($scope.year, $scope.week);
    }
    console.log("page");
  }
  $scope.produceChart($scope.year, $scope.week);
});
