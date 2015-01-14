'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ChartsCtrl', function ($scope, charts, songs, summaryDecade) {
  var year = 1960;
  // charts.query({"year": "1960"}).then(function(s){
  //   $scope.charts = s;
  //   console.log($scope.charts);
  // });
  // charts.query({ list: { $elemMatch: {"artist": "Emile Ford"} } }).then(function(s){
  //   $scope.charts = s;
  //   console.log($scope.charts);
  // });




  $scope.item = {};
  $scope.choices = [
  {
    name:'danceability',
  },
  {
    name:'duration'
  },
  {
    name:'energy'
  },
  {
    name:'loudness'
  },
  {
    name:'mode'
  },
  {
    name:'tempo'
  }
  ];



  summaryDecade.all().then(function(res){
    $scope.summaryDecade = res;
    $scope.update('danceability');
    $scope.safeToChange = true;
    $scope.try.loading = false;

  });

  $scope.getValue = function(string){
    var values = [];
    for(var i = 0; i< $scope.summaryDecade.length; i++){

      values.push($scope.summaryDecade[i][string]);
    }
    return values;
  };



  $scope.update = function(string){
    var suffix = null;
    var suffixString = '';
    $scope.try.options.tooltip.valueSuffix=suffix;
    if(string==='loudness'){
      suffix = ' db';
      suffixString = ' (Decibel)';
      $scope.try.options.tooltip.valueSuffix=suffix;

    }
    else if(string==='duration'){
      suffix = ' s';
      suffixString = ' (Seconds)';
      $scope.try.options.tooltip.valueSuffix=suffix;

    }

    $scope.try.series[0].name = string.charAt(0).toUpperCase() + string.slice(1);;
    $scope.try.series[0].data = $scope.getValue(string);
    $scope.try.yAxis.title.text = string + suffixString;
  };


  $scope.try = {
    options: {
      chart: {
        type: 'line'
      },
      tooltip: {
        valueDecimals:2,
        valueSuffix:'',
        pointFormat: '{series.name}: {point.y}'
      },

      plotOptions: {
        series: {
          marker: {
            fillColor: '#FFFFFF',
            lineWidth: 2,
            lineColor: '#dd2027',
            symbol:'circle'
          }
        }
      }
    },
    xAxis: {
      categories: [1960, 1970, 1980, 1990, 2000, 2010]
    },
    yAxis:{
      labels: {
        enabled: true
      },
      title: {
        text: null
      }
    },

    series: [{
      name:'',
      data:'',
      lineColor: '#dd2027',
      fillColor: '#dd2027',
      showInLegend: false
    }
    ],
    title: {
      text: 'Vglista Topp 20 Summary'
    },

    loading: true
  }
});