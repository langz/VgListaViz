'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ChartsCtrl', function ($scope, charts, songs, summaryYear, $location) {
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
      norsk:'Dansbarhet',
      name:'danceability',
      value: 1
    },
    {
      norsk:'Energi',
      name:'energy',
      value: 1
    },
    {
      norsk:'Liste Varighet',
      name:'hitlasting',
      value: 10
    },
    {
      norsk:'Lydstyrke',
      name:'loudness',
      value: 55
    },
    {
      norsk:'Modal skala',
      name:'mode',
      value: 1
    },
    {
      norsk:'Nøkkel',
      name:'key',
      value: 220
    },
    {
      norsk:'Taktart',
      name:'timesignature',
      value: 220
    },
    {
      norsk:'Tempo',
      name:'tempo',
      value: 220
    },
    {
      norsk:'Varighet',
      name:'duration',
      value: 1000
    }

  ];



  summaryYear.all({ sort: {"year": 1} }).then(function(res){
    $scope.summaryDecade = res;
    $scope.update(  {
      norsk:'Dansbarhet',
      name:'danceability',
      value: 1
    });
    $scope.safeToChange = true;
    $scope.try.loading = false;

  });

  $scope.getValue = function(obj){
    var norskString  = obj.norsk;
    var dataString = obj.name;

    var values = [];
    var count = 0;
    var regs = [];
    for(var i = 0; i< $scope.summaryDecade.length; i++){
      var reg = [];
      reg.push(i);
      reg.push($scope.summaryDecade[i][dataString]);

      regs.push(reg);
      values.push($scope.summaryDecade[i][dataString]);
      count = count + $scope.summaryDecade[i][dataString];
      $scope.try.xAxis.categories.push({a:$scope.summaryDecade[i].year, b: "summaryYear/" + $scope.summaryDecade[i]._id.$oid });
    }
    var regres = regression('linear', regs);
    $scope.try.series[1].name = 'Lineær regresjon(' + regres.string + ')';
    $scope.try.series[1].data = [regres.points[0], [$scope.summaryDecade.length-1,regres.points[regres.points.length-1][1]]];
    return values;
  };



  $scope.update = function(obj){
    var norskString = obj.norsk;
    var dataString = obj.name;
    var suffix = null;
    var suffixString = '';
    $scope.try.options.tooltip.valueSuffix=suffix;
    if(dataString==='loudness'){
      suffix = ' db';
      suffixString = ' (Decibel)';
      $scope.try.options.tooltip.valueSuffix=suffix;

    }
    else if(dataString==='duration'){
      suffix = ' s';
      suffixString = ' (Seconds)';
      $scope.try.options.tooltip.valueSuffix=suffix;
    }

    $scope.try.series[0].name = norskString.charAt(0).toUpperCase() + norskString.slice(1);

    $scope.try.series[0].data = $scope.getValue(obj);
    $scope.try.yAxis.title.text = norskString + suffixString;
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
        headerFormat:"<b><span style=font-size: 10px>{point.key.a}</span></b><br/>",
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
      name: 'Regresjonslinje',
      data: '',
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: true
    }
  ],
  title: {
    text: ''
  },

  loading: true,
  exporting: { enabled: false }
};

$scope.years = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967,
  1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
  1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
  1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
  2005, 2006, 2007, 2008, 2009, 2010];

  $scope.weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

    $scope.getChart = function(year, week){
      charts.query({ $and: [{"year": ""+year+""}, {"week": "Uke " +week}, {soundSummary: {$not: {$size: 0}}}]}).then(function(s){
        if(s.length===0){
          alert('Det er dessverre ikke publisert noen liste for denne uken');
        }
        else{
          s[0].title = s[0].year + " - " + s[0].week;
          $scope.goToChartTypeChart(s[0]._id.$oid);
        }

      });

    };
    $scope.goToChartTypeChart = function(oid){

      $location.path('/chart/chart/'+oid);

    };

  });
