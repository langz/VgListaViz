'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ChartsCtrl', function ($scope, charts, songs, summaryYear) {
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
    value: 1
  },
  {
    name:'duration',
    value: 1000
  },
  {
    name:'energy',
    value: 1
  },
  {
    name:'hitlasting',
    value: 10
  },
  {
    name:'loudness',
    value: 55
  },
  {
    name:'mode',
    value: 1
  },
  {
    name:'tempo',
    value: 220
  }
  ];



  summaryYear.all({ sort: {"year": 1} }).then(function(res){
    $scope.summaryDecade = res;
    $scope.update('danceability');
    $scope.safeToChange = true;
    $scope.try.loading = false;
    console.log(res);

  });

  $scope.getValue = function(string){
    console.log(string);
    var values = [];
    var count = 0;
    var regs = [];
    for(var i = 0; i< $scope.summaryDecade.length; i=i+3){
      var reg = [];

      reg.push(i);
      reg.push($scope.summaryDecade[i][string]);

      regs.push(reg);
      values.push($scope.summaryDecade[i][string]);
      count = count + $scope.summaryDecade[i][string];
      $scope.try.xAxis.categories.push({a:$scope.summaryDecade[i].year, b: "summaryYear/" + $scope.summaryDecade[i]._id.$oid });
    }
    var regres = regression('linear', regs);
    $scope.try.series[1].data = [regres.points[0], [18,regres.points[regres.points.length-1][1]]];
    $scope.try.xAxis.categories.push(2014);
    console.log(string  +  " count :" + count + "/" + values.length + " = " + count/values.length );
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

    $scope.try.series[0].name = string.charAt(0).toUpperCase() + string.slice(1);

    $scope.try.series[0].data = $scope.getValue(string);
    $scope.try.yAxis.title.text = string + suffixString;
//     for(var a = 0 ; a < $scope.choices.length; a++){
//       if($scope.choices[a].name===string){
//         $scope.try.yAxis.min = 0;
//         $scope.try.yAxis.max = $scope.choices[a].value;
// break;
//       }
//     }
  };


  $scope.try = {
    options: {
      chart: {
        type: 'line'
      },
      tooltip: {
        valueDecimals:2,
        valueSuffix:'',
        pointFormat: '{series.name}: {point.y}',
        headerFormat:"<span style=font-size: 10px>{point.key.a}</span><br/>",
        useHTML:true,
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
      categories: [],
      type: 'category',
      labels: {
        formatter: function () {
          return '<a href="#/chart/' + this.value.b + '"style="color:black;">' + this.value.a +
          '</a>';
        },
        useHTML:true
      }
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
    },
    {
      type: 'line',
      name: 'Regression Line',
      data: '',
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: false
    }
    ],
    title: {
      text: ''
    },

    loading: true
  }
});
