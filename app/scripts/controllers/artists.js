'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistsCtrl
* @description
* # ArtistsCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistsCtrl', function ($scope, summaryArtist, $location, summaryArtistTopAntall, summaryArtistTopDuration, summaryArtistTopEnergy, summaryArtistTopLoudness,
  summaryArtistTopMode, summaryArtistTopTempo, summaryArtistTopTimesignature, summaryArtistTopUnik, summaryArtistTopDanceability) {

    $scope.item = {};
    $scope.choices = [
      {
        norsk:'Antall sanger',
        name:'antallunike'
      },
      {
        norsk:'Dansbarhet',
        name:'danceability',
      },
      {
        norsk:'Energi',
        name:'energy'
      },
      {
        norsk:'Lydstyrke',
        name:'loudness'
      },
      {
        norsk:'Modal skala',
        name:'mode'
      },
      {
        norsk:'Nøkkel',
        name:'key'
      },
      {
        norsk:'Taktart',
        name:'timesignature'
      },
      {
        norsk:'Tempo',
        name:'tempo'
      },
      {
        norsk:'Antall ganger listet',
        name:'antallganger'
      },
      {
        norsk:'Varighet',
        name:'duration'
      }






    ];


    $scope.genererChart = function(obj){
      var attributt = obj.name;
      $scope.try.series[1].data = [];
      if(attributt==="danceability"){
        $scope.try.series[0].data = [];

        $scope.try.loading = true;
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y:,.2f}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopDanceability.all({sort:{danceability:-1}}).then(function(s){

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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y:,.0f}</b> sek';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,0);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopDuration.all({sort:{duration:-1}}).then(function(s){

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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y:,.2f}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopEnergy.all({sort:{energy:-1}}).then(function(s){

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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>-{point.y:,.2f} db</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return -Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopLoudness.all({sort:{loudness:1}}).then(function(s){

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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,0);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopAntall.all({sort:{antall:-1}}).then(function(s){

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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,0);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopUnik.all({sort:{antallunikesanger:-1}}).then(function(s){

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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y:,.2f}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopMode.all({sort:{mode:-1}}).then(function(s){


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
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y:,.2f}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopTempo.all({sort:{tempo:-1}}).then(function(s){

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
      if(attributt==="timesignature"){
        $scope.try.yAxis.min = 0;
        $scope.try.yAxis.max = 10;
        $scope.try.series[0].data = [];
        $scope.try.loading = true;
        $scope.try.options.tooltip.pointFormat = obj.norsk + ': <b>{point.y:,.2f}</b>';
        $scope.try.series[0].dataLabels.formatter=function(){
          return Highcharts.numberFormat(this.y,2);
        };
        $scope.try.yAxis.title.text = obj.norsk;
        summaryArtistTopTimesignature.all({sort:{timesignature:-1}}).then(function(s){

          console.log(s);
          $scope.summaryArtistTopAntall = s;
          var mainArray = [];
          for(var i=0;i<20;i++){
            var tempArray = [];
            tempArray.push($scope.summaryArtistTopAntall[i].artist);
            tempArray.push($scope.summaryArtistTopAntall[i]["timesignature"]);
            mainArray.push(tempArray);
          }
          $scope.try.loading = false;
          $scope.try.series[0].data = mainArray;
          $scope.try.series[1].data = [[0,120],[19,120]]; //MÅ FIKSES ER IKKE SNITTET PÅ TIMESIGNATURE ATM
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
        enableMouseTracking: true,
        color:'black',
        allowPointSelect: false,
        tooltip: {
          pointFormat: 'Gjennomsnittsverdi: <b>{point.y}</b>',
        }
      }],
      title: {
        text: ''
      },

      loading: true,
      exporting: { enabled: false }
    };
    $scope.goToArtist = function(artistNavn){
      console.log('/artist/'+artistNavn);
      $location.path('/artist/'+artistNavn);
    };
    $scope.searchArtist = function(inputText){
      return summaryArtist.query({$and:[{artist:{$regex:inputText, $options : 'i'}}, { danceability: { $exists: true, $nin: [ 0 ] } }]}, { limit: 10 })
      .then(function(s){
        return s.map(function(item){
          item.info = item.artist;
          item.type='artist';
          return item;
        });
      });
    };
    $scope.genererChart({
      norsk:'Antall sanger',
      name:'antallunike'
    });
  });
