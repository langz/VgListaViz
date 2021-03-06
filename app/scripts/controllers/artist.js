'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistCtrl
* @description
* # ArtistCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistCtrl',function ($scope, $routeParams, $location, summaryArtist, charts, songs, stopword) {
  $scope.isCollapsed = false;
  console.log("HEI");
  $scope.omgBool = false;
  $scope.lydClick = true;
  $scope.artist = {};
  $scope.artistnavn = $routeParams.artistnavn;
  $scope.tekst = true;
  $scope.lister = [];
  $scope.sortField='position';
  $scope.reverse = false;
  $scope.sortField2='title';
  $scope.reverse2 = false;
  $scope.changeOverTime = [];
  $scope.tempOid = [];
  var vis;
  var svg;
  var layout;
  var max;
  var fontSize;
  var w;
  var h;
  var fill;

  var artistlistetMax = 356;
  var danceabilityMax = 1;
  var durationMax = 1000;
  var energyMax = 1;
  var keyMax = 11;
  var loudnessMax =-55.124;
  var modeMax = 1;
  var tempoMax =220.04;
  var timesignatureMax=7;
  var numWeeksMax = 350;
  var numSongsMax = 33;

  var danceabilityAvg = 0.5946363853683373;
  var durationAvg = 224.95823756669492;
  var energyAvg = 0.643722652721075;
  var loudnessAvg = -8.953935982092162;
  var modeAvg = 0.7065017816252117;
  var tempoAvg = 120.10330113014082;
  var hitlastingAvg = 7.2631578947368425;
  var numWeeksAvg = 17;
  var numSongsAvg = 2;
  var timesignatureAvg=2;

  var getOid = function(title){
    for(var a = 0 ; a < $scope.tempOid.length; a++){
      if($scope.tempOid[a].title===title){
        return $scope.tempOid[a].oid;
        break;
      }
    }
  };

  $scope.changeBar = {
    options:{
      plotOptions: {
        column:{
          color:'#dd2027'
        }
      },
      legend:{
        enabled:true
      },
      tooltip: {
        formatter : function (){
          var a = '';
          var b = '';
          if(this.series.name==='Lydstyrke'){
            a = "-" + Highcharts.numberFormat(this.y,2);
          }
          else{
            a= Highcharts.numberFormat(this.y,2);
          }
          if(typeof this.key ==='number'){
            b = $scope.artist.artist +  '</br>';
          }
          else{
            b = this.key +  '</br>';
          }

          return b + this.series.name + ': <b>' + a + '</b>';

        },
        useHTML:true
      },
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      type: 'category',
      labels:{
        formatter: function () {
          return '<a href="#/song/' + getOid(this.value) + '"style="color:black;">' + this.value +
          '</a>';
        },
        useHTML:true
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    series: [{
      type: 'column',
      name: '',
      data: [

      ],
      legend:{enabled:false},
    },
    {
      type: 'line',
      name: 'Gjennomsnitt',
      data: '',
      enableMouseTracking: true,
      color:'black',
      allowPointSelect: false,
    }]
  };

  var optionsNormal = {
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

          return this.value;

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
      }
    }
  };

  var optionsLoudness = {
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

          return "-"+ this.value;

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
      }
    }
  };


  //-------------------------------------------------------
  var createDanceability = function(verdi){

    var danceability = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'danceability',
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Dansbarhet']
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
        max:danceabilityMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[danceabilityAvg], color: 'rgba(103,103,103,.35)'},
      {name:'Verdi', pointWidth:7, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[danceabilityAvg], color: 'rgba(103,103,103,.35)'}],
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
        }
      }
    });

  }
  var createDuration = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'duration'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Varighet']
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
        max:durationMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[durationAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[durationAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

      tooltip:{
        enabled:true,
        backgroundColor:'rgba(255, 255, 255, .85)',
        borderWidth:0,
        shadow:true,
        style:{fontSize:'10px',padding:2},
        formatter:function() {
          return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,0) + "s"+ "</strong>";
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
        }
      }
    });

  }
  var createListet = function(verdi){
    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'listet'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Uker på listen']
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
        max:numWeeksMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[numWeeksAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[numWeeksAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

      tooltip:{
        enabled:true,
        backgroundColor:'rgba(255, 255, 255, .85)',
        borderWidth:0,
        shadow:true,
        style:{fontSize:'10px',padding:2},
        formatter:function() {
          return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,0) + "</strong>";
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
        }
      }
    });
  }
  var createSanger = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'sanger'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Antall Sanger']
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
        max:numSongsMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[numSongsAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[numSongsAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

      tooltip:{
        enabled:true,
        backgroundColor:'rgba(255, 255, 255, .85)',
        borderWidth:0,
        shadow:true,
        style:{fontSize:'10px',padding:2},
        formatter:function() {
          return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,0) + "</strong>";
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
        }
      }
    });
  };

  var createEnergy = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'energy'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Energi']
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
        max:energyMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[energyAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[energyAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

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
        }
      }
    });
  }
  var createLoudness = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'loudness'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Lydstyrke']
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
        max:-loudnessMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return "-"+ this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[-loudnessAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[-loudnessAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

      tooltip:{
        enabled:true,
        backgroundColor:'rgba(255, 255, 255, .85)',
        borderWidth:0,
        shadow:true,
        style:{fontSize:'10px',padding:2},
        formatter:function() {
          return this.series.name + ": <strong>" +"-"+ Highcharts.numberFormat(this.y,2) + "dB" + "</strong>";
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
        }
      }
    });
  }
  var createMode = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'mode'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Modal skala']
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
        max:modeMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[modeAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[modeAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

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
        }
      }
    });
  }
  var createTempo = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'tempo'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Tempo']
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
        max:tempoMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[tempoAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[tempoAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

      tooltip:{
        enabled:true,
        backgroundColor:'rgba(255, 255, 255, .85)',
        borderWidth:0,
        shadow:true,
        style:{fontSize:'10px',padding:2},
        formatter:function() {
          return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,0) + "</strong>";
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
        }
      }
    });
  }
  var createTimesignature = function(verdi){

    var duration = new Highcharts.Chart({
      chart:{
        type:'bar',
        margin:[5,15,10,100],
        renderTo:'timesignature'
      },
      credits:{enabled:false},
      exporting:{enabled:false},
      legend:{enabled:false},
      title:{text:''},
      xAxis:{
        tickLength:0,
        lineColor:'#999',
        lineWidth:1,
        labels:{style:{fontWeight:'bold'}},
        categories:['Taktart']
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
        max:timesignatureMax,
        plotBands:[],
        title:{text: ''},
        labels:{
          y:10,
          style:{
            fontSize:'8px'
          },
          formatter:function(){

            return this.value;

          }
        }
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[timesignatureAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[timesignatureAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

      tooltip:{
        enabled:true,
        backgroundColor:'rgba(255, 255, 255, .85)',
        borderWidth:0,
        shadow:true,
        style:{fontSize:'10px',padding:2},
        formatter:function() {
          return this.series.name + ": <strong>" + Highcharts.numberFormat(this.y,0) + "</strong>";
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
        }
      }
    });
  };
  var createBulletCharts = function(obj){
    createDanceability(obj.danceability);
    createDuration(obj.duration);
    createListet(obj.antall);
    createSanger(obj.antallunikesanger);
    createEnergy(obj.energy);
    createLoudness(Math.abs(obj.loudness));
    createMode(obj.mode);
    createTempo(obj.tempo);
    createTimesignature(obj.timesignature);
  }
  $scope.choices = [
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
      norsk:'Uker på listen',
      name:'antallganger'
    },
    {
      norsk:'Varighet',
      name:'duration'
    }
  ];
  var omg = function(wordInput){
    d3.select("#vis").select("svg")
    .remove();
    if(!$scope.omgBool){
      console.log("LAGER OMG");
      fill = d3.scale.category20b();
      var maxverdien =  d3.max(wordInput.map(function(d) { return d[1]; }));
      var minverdien =  d3.min(wordInput.map(function(d) { return d[1]; }));
      w = document.getElementById('vis').offsetWidth,
      h = 500;
      var vedien = 0;
      max,
      fontSize;

      layout = d3.layout.cloud()
      .timeInterval(Infinity)
      .size([w, h])
      .fontSize(function(d) {
        vedien = d[1];
        return fontSize(+d[1])
        ;
      })
      .text(function(d) {
        return d[0];
      })
      .on("end", draw);
      svg = d3.select("#vis").append("svg")
      .attr("width", w)
      .attr("height", h);

      vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

      update();

      window.onresize = function(event) {
        d3.select("#vis").select("svg")
        .remove();
        svg = d3.select("#vis").append("svg")
        .attr("width", w)
        .attr("height", h);

        vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

        update();
      };

      function draw(data, bounds) {
        var w = document.getElementById('vis').offsetWidth,
        h = 500;
        svg.attr("width", w).attr("height", h);

        var scale = bounds ? Math.min(
          w / Math.abs(bounds[1].x - w / 2),
          w / Math.abs(bounds[0].x - w / 2),
          h / Math.abs(bounds[1].y - h / 2),
          h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

          var text = vis.selectAll("text")
          .data(data, function(d) {
            return d.text.toLowerCase();
          });
          text.transition()
          .duration(1000)
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .style("font-size", function(d) {
            return d.size + "px";
          });
          text.enter().append("text")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .style("font-size", function(d) {
            return d.size + "px";
          })
          .style("opacity", 1e-6)
          .transition()
          .duration(1000)
          .style("opacity", 1);
          text.style("font-family", function(d) {
            return d.font;
          })
          .style("fill", function(d) {
            return fill(d.text.toLowerCase());
          })
          .text(function(d) {
            return d.text;
          });
          text.append("svg:title")
          .text(function(d){return Math.round(fontSize.invert(d.size))});

          vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
        }

        function update() {
          layout.font('impact').spiral('archimedean');
          fontSize = d3.scale['linear']().range([10, 100]);
          if (wordInput.length){
            fontSize.domain([1, d3.max(wordInput.map(function(d) { return d[1]; }))]);
          }
          layout.stop().words(wordInput).start();
        }
        $scope.omgBool = true;
      }
      else{
        console.log("LAGD FØR")
      }
    };

    $scope.try = {
      options: {
        chart: {
          type: 'line'
        },
        tooltip: {
          valueDecimals:0,
          valueSuffix:'',
          pointFormat: '{series.name}: {point.y}',
          headerFormat:"<b><span style=font-size: 10px>{point.key.a}, {point.key.c}</span></b><br/><span style=font-size: 10px>{point.key.d}</span></br>",
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
            if(this.value.a){
              if(this.isFirst || this.isLast){ return '<a href="#/chart/' + this.value.b + '"style="color:black;">' + this.value.a +
              '</a>'; }
            }
          },
          useHTML:true
        }
      },
      yAxis:{
        min:1,
        max:20,
        tickInterval: 1,
        reversed: true,
        labels: {
          enabled: true
        },
        title: {
          text: "Plassering"
        }
      },

      series: [{
        name:'Plass',
        data:'',
        lineColor: '#dd2027',
        fillColor: '#dd2027',
        showInLegend: false
      }
    ],
    title: {
      text: ''
    },

    loading: true,
    exporting: { enabled: false }
  };


  $scope.genererChart = function(obj, artist){
    $scope.tempOid = [];
    var attributt = obj.name;
    $scope.changeBar.series[1].data = [];
    $scope.changeBar.series[0].name = obj.norsk;
    if(attributt==="danceability"){
      $scope.changeBar.series[0].data = [];

      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;

      var mainArray = [];
      var antall = 0
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          antall ++;
          var tempArray = [];
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].soundSummary[0].danceability);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0,artist.danceability],[antall-1,artist.danceability]];

    }
    if(attributt==="duration"){
      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;

      $scope.changeBar.yAxis.title.text = obj.norsk;

      var mainArray = [];
      var antall = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          antall++;
          var tempArray = [];
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].soundSummary[1]["duration"]);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0,artist.duration],[antall-1,artist.duration]];

    }
    if(attributt==="energy"){
      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;

      var mainArray = [];
      var antall = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          var tempArray = [];
          antall++;
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].soundSummary[2]["energy"]);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0,artist.energy],[antall-1,artist.energy]];
    }
    if(attributt==="loudness"){
      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;

      var mainArray = [];
      var antall = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          antall ++;
          var tempArray = [];
          tempArray.push(artist.sanger[i].title);
          tempArray.push(Math.abs(artist.sanger[i].soundSummary[4]["loudness"]));
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0,Math.abs(artist.loudness)],[antall-1,Math.abs(artist.loudness)]];
    }
    if(attributt==="antallganger"){
      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;

      var mainArray = [];
      var antall = 0;
      var verdi = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          antall++;
          var tempArray = [];
          verdi += artist.sanger[i].antall;
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].antall);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0, Math.floor(verdi/antall)],[antall-1, Math.floor(verdi/antall)]];
    }
    if(attributt==="mode"){

      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;

      var mainArray = [];
      var antall = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          var tempArray = [];
          antall ++;
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].soundSummary[5]["mode"]);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0, artist.mode],[antall-1,artist.mode]];
    }
    if(attributt==="tempo"){

      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;
      var mainArray = [];
      var antall = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          var tempArray = [];
          antall ++;
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].soundSummary[6]["tempo"]);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0,artist.tempo],[antall-1,artist.tempo]];
    }
    if(attributt==="timesignature"){
      $scope.changeBar.series[0].data = [];
      $scope.changeBar.loading = true;
      $scope.changeBar.yAxis.title.text = obj.norsk;
      var mainArray = [];
      var antall = 0;
      for(var i=0;i<artist.sanger.length;i++){
        if(artist.sanger[i].soundSummary.length !=0){
          antall ++;
          var tempArray = [];
          tempArray.push(artist.sanger[i].title);
          tempArray.push(artist.sanger[i].soundSummary[7]["timesignature"]);
          mainArray.push(tempArray);
          $scope.tempOid.push({title:artist.sanger[i].title, oid :artist.sanger[i]._id.$oid});
        }
      }
      $scope.changeBar.loading = false;
      $scope.changeBar.series[0].data = mainArray;
      $scope.changeBar.series[1].data = [[0,artist.timesignature],[antall-1,artist.timesignature]]; //MÅ FIKSES ER IKKE SNITTET PÅ TIMESIGNATURE ATM
    }
  };
  $scope.goToChartTypeChart = function(oid){

    $location.path('/chart/chart/'+oid);

  };
  $scope.goToCompare = function(oid){
    $location.path('/compare/artist/'+oid);
  };

  $scope.gotoSang = function(oid){
    $location.path('/song/'+oid);
  };
  $scope.goToSangTitle = function(sangTittel, artistNavn){
    songs.query({$and: [{title:sangTittel},{artist:artistNavn} ]}).then(function(res){

      $location.path('/song/'+res[0]._id.$oid);
    });
  };
  //Main
  summaryArtist.query({ artist:$scope.artistnavn }).then(function(res){
    console.log("SVAR")
    createBulletCharts(res[0]);
    $scope.artist = res[0];

    if($scope.artist.bow.length===0){
      $scope.tekst = false;
    }
    else{
      $scope.artist.bow = stopword.checkForStopWord(res[0].bow)
                  omg($scope.artist.bow );

    }

    $scope.genererChart({
      norsk:'Dansbarhet',
      name:'danceability',
    }, res[0]);
    charts.query({ list: { $elemMatch: {"artist": $scope.artist.artist}}}).then(function(res2){

      var values = [];
      var categorie = [];
      for(var a = 0 ; a<res2.length; a++){
        for(var i = 0 ; i<res2[a].list.length;i++){

          if(res2[a].list[i].artist===$scope.artist.artist){

            values.push(res2[a].list[i].position);
            categorie.push({a:res2[a].year, b: "chart/" + res2[a]._id.$oid, c:res2[a].week, d:res2[a].list[i].title});
            break;
          }
        }
      }
      $scope.try.series[0].data = values;
      $scope.try.xAxis.categories = categorie;
      $scope.try.loading = false;
      for(var a = 0 ; a<res2.length; a++){
        for(var i = 0 ; i<res2[a].list.length;i++){

          if(res2[a].list[i].artist===$scope.artist.artist){
            $scope.lister.push({position:res2[a].list[i].position, artist: res2[a].list[i].artist,
              title: res2[a].list[i].title, week: res2[a].week, year:res2[a].year, oid:res2[a]._id.$oid});
              break;
            }
          }
        }
      });
    });

    var createSim = function(){

      var links = [
        {source: "Microsoft", target: "Amazon", type: "licensing"},
        {source: "Microsoft", target: "HTC", type: "licensing"},
        {source: "Samsung", target: "Apple", type: "suit"},
        {source: "Motorola", target: "Apple", type: "suit"},
        {source: "Nokia", target: "Apple", type: "resolved"},
        {source: "HTC", target: "Apple", type: "suit"},
        {source: "Kodak", target: "Apple", type: "suit"},
        {source: "Microsoft", target: "Barnes & Noble", type: "suit"},
        {source: "Microsoft", target: "Foxconn", type: "suit"},
        {source: "Oracle", target: "Google", type: "suit"},
        {source: "Apple", target: "HTC", type: "suit"},
        {source: "Microsoft", target: "Inventec", type: "suit"},
        {source: "Samsung", target: "Kodak", type: "resolved"},
        {source: "LG", target: "Kodak", type: "resolved"},
        {source: "RIM", target: "Kodak", type: "suit"},
        {source: "Sony", target: "LG", type: "suit"},
        {source: "Kodak", target: "LG", type: "resolved"},
        {source: "Apple", target: "Nokia", type: "resolved"},
        {source: "Qualcomm", target: "Nokia", type: "resolved"},
        {source: "Apple", target: "Motorola", type: "suit"},
        {source: "Microsoft", target: "Motorola", type: "suit"},
        {source: "Motorola", target: "Microsoft", type: "suit"},
        {source: "Huawei", target: "ZTE", type: "suit"},
        {source: "Ericsson", target: "ZTE", type: "suit"},
        {source: "Kodak", target: "Samsung", type: "resolved"},
        {source: "Apple", target: "Samsung", type: "suit"},
        {source: "Kodak", target: "RIM", type: "suit"},
        {source: "Nokia", target: "Qualcomm", type: "suit"}
      ];

      var nodes = {};

      // Compute the distinct nodes from the links.
      links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
      });

      var width = document.getElementById('similar').offsetWidth,
      height = 500;

      var force = d3.layout.force()
      .nodes(d3.values(nodes))
      .links(links)
      .size([width, height])
      .linkDistance(60)
      .charge(-300)
      .on("tick", tick)
      .start();

      var svg = d3.select("#similar").append("svg")
      .attr("width", width)
      .attr("height", height);

      var link = svg.selectAll(".link")
      .data(force.links())
      .enter().append("line")
      .attr("class", "link");

      var node = svg.selectAll(".node")
      .data(force.nodes())
      .enter().append("g")
      .attr("class", "node")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .call(force.drag);

      node.append("circle")
      .attr("r", 8);

      node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

      function tick() {
        link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        node
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
      }

      function mouseover() {
        d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 16);
      }

      function mouseout() {
        d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 8);
      }
    }
  });
