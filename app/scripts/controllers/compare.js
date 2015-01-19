'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('CompareCtrl', function ($scope, songs, summaryArtist, charts, $http) {
  $scope.compType = 'Artist';
  $scope.hideValue=true;
  $scope.string2 = "";
  $scope.string1 = "";


  $scope.years = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967,
  1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
  1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
  1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
  2005, 2006, 2007, 2008, 2009, 2010];

  $scope.weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]
  var artistlistetMax = 356;

  var danceabilityMax = 1;

  var durationMax = 1000;

  var energyMax = 1;

  var keyMax = 11;

  var loudnessMax =-55.124;

  var modeMax = 1;

  var tempoMax =220.04;

  var timesignatureMax=7;


  $scope.getChart = function(year, week, number){
    charts.query({ $and: [{"year": ""+year+""}, {"week": "Uke " +week}]}).then(function(s){
      s[0].title = s[0].year + " - " + s[0].week;
      $scope.changeComparison(s[0], number);
    });

  };
  // songs.all({limit: 10000000}).then(function(s){
  //   for(var a = 0; a < s.length ; a++){
  //     if(s[a].soundSummary.length!=0){
  //
  //       if(s[a].soundSummary[1].duration>durationMax){
  //         durationMax = s[a].soundSummary[1].duration;
  //       }
  //       if(s[a].soundSummary[1].duration<durationMin){
  //         durationMin = s[a].soundSummary[1].duration;
  //       }
  //       if(s[a].soundSummary[2].energy<energyMin){
  //         energyMin = s[a].soundSummary[2].energy;
  //       }
  //       if(s[a].soundSummary[2].energy>energyMax){
  //         energyMax = s[a].soundSummary[2].energy;
  //       }
  //       if(s[a].soundSummary[3].key>keyMax){
  //         keyMax = s[a].soundSummary[3].key;
  //       }
  //       if(s[a].soundSummary[3].key<keyMin){
  //         keyMin = s[a].soundSummary[3].key;
  //       }
  //       if(s[a].soundSummary[4].loudness>loudnessMax){
  //         loudnessMax = s[a].soundSummary[4].loudness;
  //       }
  //       if(s[a].soundSummary[4].loudness<loudnessMin){
  //         loudnessMin = s[a].soundSummary[4].loudness;
  //       }
  //       if(s[a].soundSummary[5].mode<modeMin){
  //         modeMin = s[a].soundSummary[5].mode;
  //       }
  //       if(s[a].soundSummary[5].mode>modeMax){
  //         modeMax = s[a].soundSummary[5].mode;
  //       }
  //       if(s[a].soundSummary[6].tempo>tempoMax){
  //         tempoMax = s[a].soundSummary[6].tempo;
  //       }
  //       if(s[a].soundSummary[6].tempo<tempoMin){
  //         tempoMin = s[a].soundSummary[6].tempo;
  //       }
  //       if(s[a].soundSummary[7].timesignature<timesignatureMin){
  //         timesignatureMin = s[a].soundSummary[7].timesignature;
  //       }
  //       if(s[a].soundSummary[7].timesignature>timesignatureMax){
  //         timesignatureMax = s[a].soundSummary[7].timesignature;
  //       }
  //
  //     }
  //   }
  //   console.log(durationMax + 'durationMax');
  //   console.log(durationMin + 'durationMin');
  //   console.log(energyMin + 'energyMin');
  //   console.log(energyMax + 'energyMax');
  //   console.log(keyMin + 'KeyMin');
  //   console.log(keyMax + 'keyMax');
  //   console.log(loudnessMax + 'loudnessMax');
  //   console.log(loudnessMin + 'loudnessMin');
  //   console.log(modeMin + 'modeMin');
  //   console.log(modeMax + 'modeMax');
  //   console.log(tempoMin + 'tempoMin');
  //   console.log(tempoMax + 'tempoMax');
  //   console.log(timesignatureMin + 'tsMin');
  //   console.log(timesignatureMax + "tsMax");
  //
  // });

  $scope.percentageOf = function(value, category, position){
    var min = 1;
    if(position===0){
      min =-1;
    }
    var divide = 0;
    if(category==='timesignature'){
      divide = timesignatureMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='tempo'){
      divide = tempoMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='mode'){
      divide = modeMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='loudness'){
      divide = loudnessMax;
      return -((value/divide) * 100)*-min;
    }
    else if(category==='key'){
      divide = keyMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='energy'){
      divide = energyMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='duration'){
      divide = durationMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='danceability'){
      divide = danceabilityMax;
      return ((value/divide) * 100)*min;
    }
    else if(category==='listet'){
      divide = artistlistetMax;
      return ((value/divide) * 100)*min;
    }
    else{
      return value;
    }
  };

  $scope.song1 = function(inputText){

    if($scope.compType==='Song'){
      return songs.query({title:{$regex:inputText, $options : 'i'}}, { limit: 10 })
      .then(function(s){
        return s.map(function(item){
          item.info = item.title + " - " + item.artist;
          item.type='song';
          return item;
        });
      });
    }
    if($scope.compType==='Artist'){
      return summaryArtist.query({artist:{$regex:inputText, $options : 'i'}}, { limit: 10 })
      .then(function(s){
        return s.map(function(item){
          item.info = item.artist;
          item.type='artist';
          return item;
        });
      });
    }
    if($scope.compType==='Chart'){

    }



    //   return songs.query({ $or: [{title:{$regex:inputText, $options : 'i'}},
    // {artist:{$regex:inputText, $options : 'i'}}]}, { limit: 10 })
    // .then(function(s){
    //   return s.map(function(item){
    //     item.info = item.title + " - " + item.artist;
    //     return item;
    //   });
    // });

  };
  $scope.onSelect = function(inp, number) {
    if(inp.type==='song'){
      $scope.changeComparison(inp,number);
    }
    else if(inp.type==='artist'){
      $scope.artist(inp, number)
      console.log(inp);
    }
  };
  $scope.changeComparison = function(obj, number){
    var categorie = [];
    var data = [];
    var serie = {};
    var color = '#dd2027';
    if(number===0){
      color = 'black';
    }
    for(var a = 0 ; a < obj.soundSummary.length; a++){
      for(var propName in obj.soundSummary[a]){
        categorie.push(propName);
        data.push({'y':$scope.percentageOf(obj.soundSummary[a][propName], propName, number), 'color':color});
      }
    }
    serie.data = data;
    serie.name=obj.title;
    $scope.compareConfig.options.xAxis[0].categories = categorie;
    $scope.compareConfig.options.xAxis[1].categories = categorie;
    $scope.compareConfig.series[number]=serie;
    $scope.hideValue=false;

  }
  $scope.artist = function(obj, number){
    var categorie = [];
    var data = [];
    var serie = {};
    var color = '#dd2027';
    if(number===0){
      color = 'black';
    }
    data.push({'y':$scope.percentageOf(obj.danceability, 'danceability', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.duration, 'duration', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.energy, 'energy', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.key, 'key', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.loudness, 'loudness', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.mode, 'mode', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.tempo, 'tempo', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.timesignature, 'timesignature', number), 'color':color});
    data.push({'y':$scope.percentageOf(obj.antall, 'listet', number), 'color':color});

    categorie.push('danceability');
    categorie.push('duration');
    categorie.push('energy');
    categorie.push('key');
    categorie.push('loudness');
    categorie.push('mode');
    categorie.push('tempo');
    categorie.push('timesignature');
    categorie.push('listet');
    serie.data = data;
    serie.name=obj.artist;
    $scope.compareConfig.options.xAxis[0].categories = categorie;
    $scope.compareConfig.options.xAxis[1].categories = categorie;
    $scope.compareConfig.series[number]=serie;
    $scope.hideValue=false;
  };
  $scope.setTitle=function(i, string){
    console.log(i +  string);
    if(i===0){
      $scope.string1 = string;
    }
    if(i===1){
      $scope.string2 = string;
    }
    $scope.compareConfig.options.title.text= $scope.string1 + '</br>' +" VS " + $scope.string2;
  };
  $scope.changeCompType = function(inp){
    $scope.asyncSelected1 = null;
    $scope.asyncSelected2 = null;

    $scope.compType = inp;
  }

  $scope.compareConfig = {
    options: {
      chart: {
        type: 'bar'
      },
      title: {
        text: ''
      },
      xAxis: [{
        categories: null,
        reversed: false,
        labels: {
          step: 1
        }
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: null,
        linkedTo: 0,
        labels: {
          step: 1
        }
      }],
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
          this.point.category +": " + Highcharts.numberFormat(Math.abs(getValue(this.point.y, this.point.category)), 1)
          + getText(this.point.category);
        }
      }
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return '';
        }
      },
      min: -100,
      max: 100
    },



    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
        'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
      }
    },

    series: []
  };
  var getValue = function(value, category){
    if(category==='timesignature'){
      return (value/100) * timesignatureMax;
    }
    else if(category==='tempo'){
      return (value/100) * tempoMax;
    }
    else if(category==='mode'){
      return (value/100) * modeMax;
    }
    else if(category==='loudness'){
      return (value/100) * loudnessMax;
    }
    else if(category==='key'){
      return (value/100) * keyMax;
    }
    else if(category==='energy'){
      return (value/100) * energyMax;
    }
    else if(category==='duration'){
      return (value/100) * durationMax;
    }
    else if(category==='danceability'){
      return (value/100) * danceabilityMax;
    }
    else if(category==='listet'){
      return (value/100) * artistlistetMax;
    }
    else{
      return value;
    }
  };
  var getText = function(category){

    if(category==='loudness'){
      return "dB";
    }
    else if(category==='duration'){
      return "s";
    }
    else if(category==='listet'){
      return " ganger";
    }
    else{
      return '';
    }
  };



});
