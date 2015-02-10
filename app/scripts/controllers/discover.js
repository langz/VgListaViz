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


  var standard =  [
    {
      norsk:'Dansbarhet',
      name:'danceability',
      value:0,
      max:1
    },
    {
      norsk:'Energi',
      name:'energy',
      value:2,
      max:1
    },
    {
      norsk:'Lydstyrke',
      name:'loudness',
      value:4
    },
    {
      norsk:'Modal skala',
      name:'mode',
      value:5,
      max:1
    },
    {
      norsk:'Taktart',
      name:'timesignature',
      value:7,
      max:7
    },
    {
      norsk:'Tempo',
      name:'tempo',
      value:6,
      max:220
    },
    {
      norsk:'Varighet',
      name:'duration',
      value:1,
      max:1000
    }
  ];


  $scope.choicesX = angular.copy(standard);
  $scope.choicesY = angular.copy(standard);
  $scope.itemY ={
    norsk:'Dansbarhet',
    name:'danceability',
    value:0,
    max:1
  }
  $scope.itemX ={
    norsk:'Energi',
    name:'energy',
    value:2,
    max:1
  }
  //INIT
  $scope.choicesY.push({norsk:'Uker på listen', name:'antall'});
  $scope.choicesY.push({norsk:'Beste plassering', name:'bestPos'})
  $scope.choicesX.push({norsk:'Uker på listen', name:'antall'});
  $scope.choicesX.push({norsk:'Beste plassering', name:'bestPos'})
  $scope.type ='Sang';
  songs.query( {soundSummary: {$not: {$size: 0}}}, {limit:100}).then(function(res){
    $scope.songs = res;
    $scope.update($scope.itemX, $scope.itemY, $scope.songs);
    $scope.safeToChange=true;
  });

  $scope.changeRangeYear = function(yr){
    console.log($scope.type);
    if($scope.type==='Liste'){

      $scope.getCharts(yr);
    }
    else if($scope.type==='Sang'){
      $scope.getSongs(yr);

    }
    else{
      $scope.getArtists(yr);
    }

  }

  $scope.getSongs = function(yr){
    if($scope.songs.length===0){
      songs.query({soundSummary: {$not: {$size: 0}}}, {limit:100}).then(function(res){

        $scope.songs = res;
        $scope.update($scope.itemX, $scope.itemY, $scope.songs);
        $scope.try.loading = false;
        $scope.safeToChange=true;
      });

    }
    else{
      $scope.try.loading = false;
      $scope.safeToChange=true;
      $scope.update($scope.itemX, $scope.itemY, $scope.songs);

    }
    if(yr){
      var sortData = [];
      for(var tell = 0 ; tell<$scope.songs.length ; tell ++){
        console.log($scope.songs[tell].year + " === " + yr)
        if($scope.songs[tell].years.indexOf(String(yr))){
          sortData.push($scope.songs[tell]);
        }
      }
      $scope.update($scope.itemX, $scope.itemY, sortData);
    }
  };
  $scope.getCharts = function(yr){
    if($scope.charts.length===0){

      charts.query({soundSummary: {$not: {$size: 0}}}, {limit:100}).then(function(res){
        $scope.charts = res;
        $scope.update($scope.itemX, $scope.itemY, $scope.charts);
        $scope.try.loading = false;
        $scope.safeToChange=true;
      });

    }
    else{
      $scope.try.loading = false;
      $scope.safeToChange=true;
      $scope.update($scope.itemX, $scope.itemY, $scope.charts);

    }
    if(yr){
      var sortData = [];
      for(var tell = 0 ; tell<$scope.charts.length ; tell ++){
        console.log($scope.charts[tell].year + " === " + yr)
        if($scope.charts[tell].year === (String(yr))){
          sortData.push($scope.charts[tell]);
        }
      }
      $scope.update($scope.itemX, $scope.itemY, sortData);
    }
  };
  $scope.getArtists = function(){

    if($scope.artists.length===0){
      summaryArtist.query( { danceability: { $exists: true, $nin: [ 0 ] } }, {limit:100}).then(function(res){
        $scope.artists = res;
        $scope.update($scope.itemX, $scope.itemY, $scope.artists);
        $scope.try.loading = false;
        $scope.safeToChange=true;
      });
    }
    else{
      $scope.try.loading = false;
      $scope.safeToChange=true;
      $scope.update($scope.itemX, $scope.itemY, $scope.artists);
    }
    if(yr){
      var sortData = [];
      for(var tell = 0 ; tell<$scope.artists.length ; tell ++){
        console.log($scope.artists[tell].year + " === " + yr)
        if($scope.songs[tell].artists.indexOf(String(yr))){
          sortData.push($scope.artists[tell]);
        }
      }
      $scope.update($scope.itemX, $scope.itemY, sortData);
    }
  };


  $scope.changeType = function(){

    $scope.try.loading = true;
    $scope.safeToChange=false;
    $scope.resetSelects(6);

    if($scope.type==='Artist'){
      $scope.itemY =$scope.choicesY[0];
      $scope.itemX =$scope.choicesX[1];

      $scope.choicesY.push({norsk:'Uker på listen', name:'antall', max:33});
      $scope.choicesY.push({norsk:'Antall sanger', name:'antallunikesanger', max:350})
      $scope.choicesX.push({norsk:'Uker på listen', name:'antall', max:33});
      $scope.choicesX.push({norsk:'Antall sanger', name:'antallunikesanger', max:350})

      $scope.getArtists();
    }
    else if($scope.type==='Liste'){
      $scope.itemY =$scope.choicesY[0];
      $scope.itemX =$scope.choicesX[1];


      $scope.getCharts();
    }
    else if($scope.type==='Sang'){
      $scope.itemY =$scope.choicesY[0];
      $scope.itemX =$scope.choicesX[1];

      $scope.choicesY.push({norsk:'Uker på listen', name:'antall', max: 60});
      $scope.choicesY.push({norsk:'Beste plassering', name:'bestPos', max:20})
      $scope.choicesX.push({norsk:'Uker på listen', name:'antall', max: 60});
      $scope.choicesX.push({norsk:'Beste plassering', name:'bestPos', max:20})
      $scope.getSongs();

    }
    else{

    }
    $scope.safeToChange=true;
  };

  $scope.changeAttr = function(){
    $scope.try.loading = true;
    $scope.safeToChange=false;

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

  $scope.resetSelects = function(inputInt){

    if($scope.choicesY.length > inputInt){
      var temp = angular.copy($scope.choicesY.length);
      for(var a = temp ; a > inputInt;  a--){

        $scope.choicesY.splice(a, 1);
      }
    }
    if($scope.choicesX.length > inputInt){
      var temp = angular.copy($scope.choicesX.length);
      for(var a = temp ; a > inputInt;  a--){

        $scope.choicesX.splice(a, 1);
      }
    }
  };

  $scope.update = function(xaxis, yaxis, datainp){

    $scope.produceData(xaxis, yaxis, datainp);


  };
  $scope.produceData = function(xaxis, yaxis, datainp){

    $scope.try.xAxis.max = xaxis.max;
    $scope.try.yAxis.max = yaxis.max;

    $scope.try.loading = true;
    $scope.try.xAxis.title.text = xaxis.norsk;
    $scope.try.yAxis.title.text = yaxis.norsk;

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
          xtype: xaxis.norsk,
          ytype:yaxis.norsk
        };

      }
      else if($scope.type==='Artist'){
        data = {
          name:sangen.artist,
          x:sangen[xaxis.name],
          y:sangen[yaxis.name],
          artist:"",
          xtype: xaxis.norsk,
          ytype:yaxis.norsk
        }
      }
      else if($scope.type==='Sang'){


        data = {
          name:sangen.title,
          artist:sangen.artist,
          xtype: xaxis.norsk,
          ytype:yaxis.norsk
        };
        var x = false;
        var y = false;
        if(xaxis.name==='antall' || xaxis.name ==='bestPos'){
          data.x = sangen[xaxis.name];
          x = true;
        }
        if(yaxis.name==='antall' || yaxis.name ==='bestPos'){
          data.y = sangen[yaxis.name];
          y = true;
        }
        if(!x & !y){
          data.x = sangen.soundSummary[xaxis.value][xaxis.name];
          data.y = sangen.soundSummary[yaxis.value][yaxis.name];
        }
        if(x & !y){
          data.y = sangen.soundSummary[yaxis.value][yaxis.name];
        }
        if(y & !x){
          data.x = sangen.soundSummary[xaxis.value][xaxis.name];
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
