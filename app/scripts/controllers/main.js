'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('MainCtrl', function ($scope, charts, songs, summaryDecade, $location) {
  $scope.sortField2 = 'position';
  $scope.reverse2 = false;
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
        $scope.chart.feil="Det finnes dessverre ingen liste for Uke " + week + " i " + year;
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
  $scope.goToChartTypeChart = function(oid){

    $location.path('/chart/chart/'+oid);

  };
  $scope.goToSangTitle = function(sangTittel, artistNavn){
    songs.query({$and: [{title:sangTittel},{artist:artistNavn} ]}).then(function(res){

      $location.path('/song/'+res[0]._id.$oid);
    });
  };
  $scope.getChart = function(){
    return $scope.chart;
  }
  $scope.changePagination = function(){
    $scope.chart = {};
    if($scope.year < 1960){
      $scope.year=1960;
      $scope.chart.feil="Det finnes dessverre ikke lister fra før 1960"
    }
    else{
      $scope.produceChart($scope.year, $scope.week);
    }
    console.log("page");
  }

  $scope.produceChart($scope.year, $scope.week);
});
