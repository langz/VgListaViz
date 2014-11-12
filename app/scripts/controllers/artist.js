'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistCtrl
* @description
* # ArtistCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistCtrl', function ($scope, $routeParams, summaryArtist) {
  $scope.artist = {};
  $scope.artistName = $routeParams.artistnavn;
  summaryArtist.query({ artist:$routeParams.artistnavn }).then(function(s){
    console.log(s);

    $scope.artist = s[0];

    $scope.danceability.loading = false;
    $scope.danceability.series[0].data = [s[0].danceability];

    $scope.duration.loading = false;
    $scope.duration.series[0].data = [s[0].duration];

    $scope.energy.loading = false;
    $scope.energy.series[0].data = [s[0].energy];

    $scope.loudness.loading = false;
    $scope.loudness.series[0].data = [s[0].loudness +60];

    $scope.mode.loading = false;
    $scope.mode.series[0].data = [s[0].mode];

    $scope.tempo.loading = false;
    $scope.tempo.series[0].data = [s[0].tempo];

  });




  var optionsSettings = {
    chart:{
      type:'bar',
      margin:[5,15,10,100],
    },
    credits:{enabled:false},
    exporting:{enabled:false},
    legend:{enabled:false},
    title:{text:''},
    xAxis:{
      tickLength:0,
      lineColor:'#999',
      lineWidth:1,
      labels:{style:{fontWeight:'bold'}}
    },
    yAxis:{
      min:0,
      minPadding:0,
      maxPadding:0,
      tickColor:'#ccc',
      tickWidth:1,
      tickLength:3,
      gridLineWidth:0,
      endOnTick:true,
      title:{text: ''},
      labels:{
        y:10,
        style:{
          fontSize:'8px'
        },
        formatter:function(){
          if (this.isLast){
            return this.value + ' %';
          }
          else{
            return this.value;
          }
        }
      }
    },
    tooltip:{
      enabled:true,
      backgroundColor:'rgba(255, 255, 255, .85)',
      borderWidth:0,
      shadow:true,
      style:{fontSize:'10px',padding:2},
      formatter:function() {
        return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,2) + "</strong>";
      }
    },
    plotOptions:{
      bar:{
        color:'#000',
        shadow:false,
        borderWidth:0,
      },
      scatter:{
        marker:{
          symbol:'line',
          lineWidth:3,
          radius:8,
          lineColor:'#000'
        }
      },
series:{
stacking:'normal'
}
    }
  };
var optionsSettingsLoudness = {
  chart:{
    type:'bar',
    margin:[5,15,10,100],
  },
  credits:{enabled:false},
  exporting:{enabled:false},
  legend:{enabled:false},
  title:{text:''},
  xAxis:{
    tickLength:0,
    lineColor:'#999',
    lineWidth:1,
    labels:{style:{fontWeight:'bold'}}
  },
  yAxis:{
    min:0,
    minPadding:0,
    maxPadding:0,
    tickColor:'#ccc',
    tickWidth:1,
    tickLength:3,
    gridLineWidth:0,
    endOnTick:true,
    title:{text: ''},
    labels:{
      y:10,
      style:{
        fontSize:'8px'
      },
      formatter:function(){
        if (this.isLast){
          return this.value + ' %';
        }
        else{
          return this.value;
        }
      }
    }
  },
  tooltip:{
    enabled:true,
    backgroundColor:'rgba(255, 255, 255, .85)',
    borderWidth:0,
    shadow:true,
    style:{fontSize:'10px',padding:2},
    formatter:function() {
      return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y -60) + "</strong>";
    }
  },
  plotOptions:{
    bar:{
      color:'#000',
      shadow:false,
      borderWidth:0,
    },
    scatter:{
      marker:{
        symbol:'line',
        lineWidth:3,
        radius:8,
        lineColor:'#000'
      }
    },
series:{
stacking:'normal'
}
  }
};

  $scope.danceability = {
    options: optionsSettings,
    xAxis:{categories:['Danceability']},
    yAxis:{
      max:1,tickInterval:0.1, min:0,
      labels:{y:10,style:{fontSize:'8px'},formatter:function(){return this.value;}},
      plotBands:[{from:0,to:0.5929229297139219,color: 'rgba(103,103,103,.35)'}]
    },
    series:[{name:'Danceability',pointWidth:10,data:[]}],
    loading:true
  }
  $scope.duration = {
    options: optionsSettings,
    xAxis:{categories:['Duration']},
    yAxis:{
      max:500,tickInterval:30,
      labels:{y:10,style:{fontSize:'8px'},formatter:function(){return this.value;}},
      plotBands:[{from:0,to:225.9780669183145,color: 'rgba(103,103,103,.35)'}]
    },
    series:[{name:'Duration',pointWidth:10,data:[]}],
    loading:true
  }
  $scope.energy = {
    options: optionsSettings,
    xAxis:{categories:['Energy']},
    yAxis:{
      max:1,tickInterval:0.1, min:0,
      labels:{y:10,style:{fontSize:'8px'},formatter:function(){return this.value;}},
      plotBands:[{from:0,to:0.655180344048848,color: 'rgba(103,103,103,.35)'}]
    },
    series:[{name:'Energy',pointWidth:10,data:[]}],
    loading:true
  }
  $scope.loudness = {
    options: optionsSettingsLoudness,
    xAxis:{categories:['Loudness']},
    yAxis:{
      max:60,tickInterval:5, min: 0,
      labels:{y:10,style:{fontSize:'8px'},formatter:function(){return "-" + (60-this.value);}},
      plotBands:[{from:0,to:51.4,color: 'rgba(103,103,103,.35)',           events: {
                    mouseover: function(e) {
                      console.log(this);
                    }}}]
    },
    series:[{name:'Loudness',pointWidth:10,data:[]}],
    loading:true
  }
  $scope.mode = {
    options: optionsSettings,
    xAxis:{categories:['Mode']},
    yAxis:{
      max:1,tickInterval:0.1, min:0,
      labels:{y:10,style:{fontSize:'8px'},formatter:function(){return this.value;}},
      plotBands:[{from:0,to:0.6993704940868054,color: 'rgba(103,103,103,.35)'}]
    },
    series:[{name:'Mode',pointWidth:10,data:[]}],
    loading:true
  }
  $scope.tempo = {
    options: optionsSettings,
    xAxis:{categories:['Tempo']},
    yAxis:{
      max:230,tickInterval:30,
      labels:{y:10,style:{fontSize:'8px'},formatter:function(){return this.value;}},
      plotBands:[{from:0,to:120.1342181717864,color: 'rgba(103,103,103,.35)'}]
    },
    series:[{name:'Tempo',pointWidth:10,data:[]}],
    loading:true
  }
});
