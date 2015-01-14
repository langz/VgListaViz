'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:DiscoverCtrl
* @description
* # DiscoverCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('DiscoverCtrl', function ($scope, songs) {
  $scope.songs = {};
  $scope.safeToChange=false;

  $scope.itemX = {
    name:'danceability',
    value:0,
    min:0,
    max:1
  };
  $scope.choicesX = [
  {
    name:'danceability',
    value:0,
    min:0,
    max:1
  },
  {
    name:'duration',
    value:1,
    min:0,
    max:1850
  },
  {
    name:'energy',
    value:2,
    min:0,
    max:1
  },
  {
    name:'loudness',
    value:4,
    min:-55.5,
    max:0
  },
  {
    name:'mode',
    value:5,
    min:0, max:1
  },
  {
    name:'tempo',
    value:6,
    min:0,
    max:225
  },
  {
    name:'timesignature',
    value:7,
    min:1,
    max:7
  }
  ];

  $scope.itemY = {
    name:'duration',
    value:1,
    min:0,
    max:1850
  };
  $scope.choicesY = [
{
  name:'danceability',
  value:0,
  min:0,
  max:1
},
{
  name:'duration',
  value:1,
  min:0,
  max:1850
},
{
  name:'energy',
  value:2,
  min:0,
  max:1
},
{
  name:'loudness',
  value:4,
  min:-55.5,
  max:0
},
{
  name:'mode',
  value:5,
  min:0, max:1
},
{
  name:'tempo',
  value:6,
  min:0,
  max:225
},
{
  name:'timesignature',
  value:7,
  min:1,
  max:7
}
  ];

  songs.query( {soundSummary: {$not: {$size: 0}}}).then(function(res){
    $scope.songs = res;
    console.log(res);
    $scope.update($scope.itemX, $scope.itemY);
    $scope.safeToChange=true;
  });



  $scope.update = function(xaxis, yaxis){
    $scope.produceData(xaxis, yaxis);


  };
  $scope.produceData = function(xaxis, yaxis){
    $scope.try.xAxis.title.text = xaxis.name;
    $scope.try.yAxis.title.text = yaxis.name;

    $scope.safeToChange=false;
    $scope.try.series[0].data=[];
    for(var i = 0; i<$scope.songs.length; i ++){
      var sangen = $scope.songs[i];


      var data = {
        name:sangen.title,
        x:sangen.soundSummary[xaxis.value][xaxis.name],
        y:sangen.soundSummary[yaxis.value][yaxis.name],
        artist:sangen.artist,
        xtype: xaxis.name,
        ytype:yaxis.name
      }
      $scope.try.series[0].data.push(data);
    }


    $scope.try.loading = false;
    $scope.safeToChange=true;
  };



  $scope.try = {
    options: {
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: 'Discovery'
      },

      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)'
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat:'',
            pointFormat: '<b>{point.name}</b> by {point.artist} <br/>{point.xtype}: {point.x:.1f} <br/> {point.ytype}: {point.y:.1f} '
          }
        },
        series: {
          turboThreshold: 4000
        }
      }
    },
    xAxis: {
      title: {
        enabled: true,
        text: 'xAxis'
      },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true
    },
    yAxis: {
      title: {
        text: 'yAxis'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 100,
      y: 70,
      floating: true,
      backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
      borderWidth: 1
    },
    series: [{
      showInLegend: false,
      name: 'Data',
      color: 'rgba(223, 83, 83, .5)',
      data: []

    }],

    loading: true
  }
});
