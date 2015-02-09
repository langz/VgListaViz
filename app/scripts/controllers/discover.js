'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:DiscoverCtrl
* @description
* # DiscoverCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('DiscoverCtrl', function ($scope, songs, charts, summaryArtist) {
  $scope.songs = [];
  $scope.artists = [];
  $scope.charts = [];
  $scope.safeToChange=false;

  $scope.types = [
  'Artist',
  'Liste',
  'Sang'
  ];

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
//INIT
songs.query( {soundSummary: {$not: {$size: 0}}}, {limit:100}).then(function(res){
  $scope.songs = res;
  console.log(res.length);
  $scope.update($scope.itemX, $scope.itemY, $scope.songs);
  $scope.safeToChange=true;
});

$scope.getSongs = function(){
  if($scope.songs.length===0){
    songs.query( {soundSummary: {$not: {$size: 0}}}, {limit:1}).then(function(res){
      $scope.songs = res;
      $scope.update($scope.itemX, $scope.itemY, $scope.songs);
      $scope.try.loading = false;
      $scope.safeToChange=true;
    });

  }
  else{
    $scope.try.loading = false;
    $scope.safeToChange=true;
    console.log('finnes songs');
    $scope.update($scope.itemX, $scope.itemY, $scope.songs);

  }
};
$scope.getCharts = function(){
  if($scope.charts.length===0){

    charts.query( {soundSummary: {$not: {$size: 0}}}, {limit:1}).then(function(res){
      $scope.charts = res;
      $scope.update($scope.itemX, $scope.itemY, $scope.charts);
      $scope.try.loading = false;
      $scope.safeToChange=true;
    });

  }
  else{
    $scope.try.loading = false;
    $scope.safeToChange=true;
    console.log('finnes charts');
    $scope.update($scope.itemX, $scope.itemY, $scope.charts);

  }
};
$scope.getArtists = function(){

  if($scope.artists.length===0){
    summaryArtist.query( { danceability: { $exists: true, $nin: [ 0 ] } }, {limit:1}).then(function(res){
      $scope.artists = res;
      $scope.update($scope.itemX, $scope.itemY, $scope.artists);
      $scope.try.loading = false;
      $scope.safeToChange=true;
    });
  }
  else{
    $scope.try.loading = false;
    $scope.safeToChange=true;
    console.log('finnes artists');
    $scope.update($scope.itemX, $scope.itemY, $scope.artists);
  }
};


$scope.changeType = function(){
$scope.try.loading = true;
  $scope.safeToChange=false;
  console.log('halla');
  if($scope.type==='Artist'){
    $scope.getArtists();
  }
  else if($scope.type==='Liste'){
    $scope.getCharts();
  }
  else if($scope.type==='Sang'){
    $scope.getSongs();

  }
  else{

  }
  $scope.safeToChange=true;
};


$scope.update = function(xaxis, yaxis, datainp){

  $scope.produceData(xaxis, yaxis, datainp);


};
$scope.produceData = function(xaxis, yaxis, datainp){
console.log('produsererer nå');
  $scope.try.loading = true;
  $scope.try.xAxis.title.text = xaxis.name;
  $scope.try.yAxis.title.text = yaxis.name;

  $scope.safeToChange=false;
  $scope.try.series[0].data=[];
  for(var i = 0; i<datainp.length; i ++){

    var sangen = datainp[i];
    var data = {};
    if($scope.type==='Liste'){
      data = {
        name:sangen.year,
        x:sangen.soundSummary[xaxis.value][xaxis.name],
        y:sangen.soundSummary[yaxis.value][yaxis.name],
        artist:sangen.week,
        xtype: xaxis.name,
        ytype:yaxis.name
      };

    }
    else if($scope.type==='Artist'){
      data = {
        name:sangen.artist,
        x:sangen[xaxis.name],
        y:sangen[yaxis.name],
        artist:"",
        xtype: xaxis.name,
        ytype:yaxis.name
      }
    }
    else if($scope.type==='Sang'){
      data = {
        name:sangen.title,
        x:sangen.soundSummary[xaxis.value][xaxis.name],
        y:sangen.soundSummary[yaxis.value][yaxis.name],
        artist:sangen.artist,
        xtype: xaxis.name,
        ytype:yaxis.name
      }
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
      text: ''
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
          pointFormat: '<b>{point.name}</b>  {point.artist} <br/>{point.ytype}: {point.y:.1f} <br/> {point.xtype}: {point.x:.1f} ',
          hideDelay: 4000,
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
