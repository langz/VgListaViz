'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistsCtrl
* @description
* # ArtistsCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistsCtrl', function ($scope, summaryArtist) {

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
  },
  {
    name:'antallganger'
  },
  {
    name:'antallunike'
  }
  ];


  $scope.genererChart = function(attributt){

    if(attributt==="danceability"){
      $scope.try.series[0].data = [];

      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Danceability: <b>{point.y:,.2f}</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,2);
      };
      $scope.try.yAxis.title.text = 'Danceability';
      summaryArtist.all({ sort: {"danceability": -1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["danceability"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
$scope.try.yAxis.min = 0;
$scope.try.yAxis.max = 1;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,0.6],[19,0.6]];
      });
    }
    if(attributt==="duration"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 1000;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Duration: <b>{point.y:,.0f}</b> sec';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,0);
      };
      $scope.try.yAxis.title.text = 'Duration';
      summaryArtist.all({ sort: {"duration": -1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["duration"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,225],[19,225]];
      });
    }
    if(attributt==="energy"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 1;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Energy: <b>{point.y:,.2f}</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,2);
      };
      $scope.try.yAxis.title.text = 'Energy';
      summaryArtist.all({ sort: {"energy": -1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["energy"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,0.65],[19,0.65]];
      });
    }
    if(attributt==="loudness"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 60;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Loudness: <b>-{point.y:,.2f} db</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return -Highcharts.numberFormat(this.y,2);
      };
      $scope.try.yAxis.title.text = 'Loudness';
      summaryArtist.all({ sort: {"loudness": 1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push(Math.abs($scope.summaryArtistTopAntall[i]["loudness"]));
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,9],[19,9]];
      });
    }
    if(attributt==="antallganger"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 356;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Antall ganger listet: <b>{point.y}</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,0);
      };
      $scope.try.yAxis.title.text = 'Antall ganger listet';
      summaryArtist.all({ sort: {"antall": -1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["antall"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0, 17],[19, 17]];
      });
    }
    if(attributt==="antallunike"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 37;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Antall unike sanger: <b>{point.y}</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,0);
      };
      $scope.try.yAxis.title.text = 'Antall unike sanger';
      summaryArtist.all({ sort: {"antallunikesanger": -1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["antallunikesanger"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,2],[19,2]];
      });
    }
    if(attributt==="mode"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 1;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Mode: <b>{point.y:,.2f}</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,2);
      };
      $scope.try.yAxis.title.text = 'Mode';
      summaryArtist.all({ sort: {"mode": -1} }).then(function(s){


        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["mode"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,0.7],[19,0.7]];
      });
    }
    if(attributt==="tempo"){
      $scope.try.yAxis.min = 0;
      $scope.try.yAxis.max = 220;
      $scope.try.series[0].data = [];
      $scope.try.loading = true;
      $scope.try.options.tooltip.pointFormat = 'Tempo: <b>{point.y:,.2f}</b>';
      $scope.try.series[0].dataLabels.formatter=function(){
        return Highcharts.numberFormat(this.y,2);
      };
      $scope.try.yAxis.title.text = 'Tempo';
      summaryArtist.all({ sort: {"tempo": -1} }).then(function(s){

        console.log(s);
        $scope.summaryArtistTopAntall = s;
        var mainArray = [];
        for(var i=0;i<20;i++){
          var tempArray = [];
          tempArray.push($scope.summaryArtistTopAntall[i].artist);
          tempArray.push($scope.summaryArtistTopAntall[i]["tempo"]);
          mainArray.push(tempArray);
        }
        $scope.try.loading = false;
        $scope.try.series[0].data = mainArray;
        $scope.try.series[1].data = [[0,120],[19,120]];
      });
    }

  };

  $scope.try = {
    options: {
      tooltip: {
        pointFormat: 'Antall ganger listet: <b>{point.y}</b>',
      },

      plotOptions: {
        column:{
          color:'#dd2027'
        }
      },
      legend: {
        enabled: false
      }
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -90,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif'
        },
        formatter: function () {
          return '<a href="#/artist/' + this.value + '"style="color:black;">' + this.value +
          '</a>';
        },
        useHTML:true
      },


    },
    yAxis: {
      min: 0,
      title: {
        text: 'Times Listed'
      }
    },


    series: [{
      name: '',
      type:'column',
      data:[],
      dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        x: 4,
        y: 10,
        style: {
          fontSize: '13px',
          fontFamily: 'Verdana, sans-serif',
          textShadow: '0 0 3px black'
        },
        formatter: function () {
          return Highcharts.numberFormat(this.y,2);
        }
      },
    },
    {
      type: 'line',
      name: 'Average',
      data: '',
      marker: {
        enabled: false
      },
      enableMouseTracking: false,
      color:'black',
      allowPointSelect: false,
      tooltip: {
        pointFormat: 'Gjennomsnittsverdi: <b>{point.y}</b>',
      }
    }],
    title: {
      text: ''
    },

    loading: true
  };

  $scope.genererChart('danceability');
});
