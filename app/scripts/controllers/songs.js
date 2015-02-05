'use strict';

/**
 * @ngdoc function
 * @name vgListaVizApp.controller:SongsCtrl
 * @description
 * # SongsCtrl
 * Controller of the vgListaVizApp
 */
angular.module('vgListaVizApp')
  .controller('SongsCtrl', function ($scope, summaryArtist, $location, songs) {

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
      }
    ];


    $scope.genererChart = function(attributt){
      console.log("s")
      $scope.try.series[1].data = [];
      if(attributt==="danceability"){
        $scope.try.series[0].data = [];

        $scope.try.loading = true;
        $scope.try.options.tooltip.pointFormat = 'Danceability: <b>{point.y:,.2f}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = 'Danceability';
        songs.all({ sort: {"soundSummary.danceability": -1} }).then(function(s){

          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            tempArray.push($scope.songs[i].soundSummary[0]["danceability"]);
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
        songs.all({ sort: {"soundSummary.duration": -1} }).then(function(s){

          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            tempArray.push($scope.songs[i].soundSummary[1]["duration"]);
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
        songs.all({ sort: {"soundSummary.energy": -1} }).then(function(s){

          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            tempArray.push($scope.songs[i].soundSummary[2]["energy"]);
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
        songs.all({ sort: {"soundSummary.loudness": -1} }).then(function(s){

          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            console.log($scope.songs[i].soundSummary);
            tempArray.push(Math.abs($scope.songs[i].soundSummary[4]["loudness"]));
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
        songs.all({ sort: {"soundSummary.antall": -1} }).then(function(s){

          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            tempArray.push($scope.songs[i].soundSummary[0]["antall"]);
            mainArray.push(tempArray);
          }
          $scope.try.loading = false;
          $scope.try.series[0].data = mainArray;
          $scope.try.series[1].data = [[0, 17],[19, 17]];
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
        songs.all({ sort: {"soundSummary.mode": -1} }).then(function(s){


          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            tempArray.push($scope.songs[i].soundSummary[5]["mode"]);
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
        songs.all({ sort: {"soundSummary.tempo": -1} }).then(function(s){

          console.log(s);
          $scope.songs = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.songs[i].title);
            tempArray.push($scope.songs[i].soundSummary[6]["tempo"]);
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
            return '<a href="#/artist/' + this.value + '"style="color:black;">' + this.value.substring(0, 12) +
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
    $scope.goToSang = function(oid){

      $location.path('/song/'+oid);
    };
  $scope.searchSong = function(inputText){
    return songs.query({$and:[{title:{$regex:inputText, $options : 'i'}}, {soundSummary: {$not: {$size: 0}}}]}, { limit: 10 })
    .then(function(s){
      return s.map(function(item){
        item.info = item.title + " - " + item.artist;
        item.type='song';
        return item;
      });
    });
  };
    $scope.genererChart('danceability');
  });
