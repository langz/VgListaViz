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
    name:'hitlasting'
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
      $scope.try.series[0].data = mainArray;
    });
  }
  if(attributt==="duration"){

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
      });
    }
    if(attributt==="energy"){
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
        });
      }
        if(attributt==="loudness"){
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
            });
          }
          if(attributt==="antallganger"){
            $scope.try.series[0].data = [];
            $scope.try.loading = true;
            $scope.try.options.tooltip.pointFormat = 'Antall ganger listet: <b>{this.y}</b>';
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
              });
            }
            if(attributt==="antallunike"){
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
                });
              }
            if(attributt==="mode"){
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
                });
              }
              if(attributt==="tempo"){
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
                  });
                }

};

  $scope.try = {
    options: {
      chart: {
        type: 'column'
      },
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
      name: 'Population',
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
      }
    }],
    title: {
      text: ''
    },

    loading: true
  }
  $scope.genererChart('danceability');
});
