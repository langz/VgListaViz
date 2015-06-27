'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:SongCtrl
* @description
* # SongCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('SongCtrl',function ($scope, $routeParams, $location, songs, summaryArtist, charts, related, stopword) {
  $scope.item = {};
  $scope.gjort1 = false;
  $scope.hideit=false;
  $scope.choices = [
    {
      norsk:'Tekstlig',
      name:'Tekstlig'
    },
    {
      norsk:'Akustisk',
      name:'Akustisk',
    }
  ];
  $scope.isCollapsed = false;
  $scope.lydClick = true;
  $scope.song = {};
  $scope.related = {};
  $scope.song.artist = "";
  $scope.oid = $routeParams.oid;
  $scope.tekst = true;
  $scope.soundData = true;
  $scope.komigjen = [];
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
  var antallUkerMax = 60;

  var danceabilityAvg = 0.5946363853683373;
  var durationAvg = 224.95823756669492;
  var energyAvg = 0.643722652721075;
  var loudnessAvg = -8.953935982092162;
  var modeAvg = 0.7065017816252117;
  var tempoAvg = 120.10330113014082;
  var hitlastingAvg = 7.2631578947368425;
  var antallUkerAvg = 9;
  var timesignatureAvg = 2;




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
        max:antallUkerMax,
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
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[antallUkerAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[antallUkerAvg], color: 'rgba(103,103,103,.35)', zIndex:0}],

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
    createDanceability(obj.soundSummary[0].danceability);
    createDuration(obj.soundSummary[1].duration);
    createEnergy(obj.soundSummary[2].energy);
    createLoudness(Math.abs(obj.soundSummary[4].loudness));
    createMode(obj.soundSummary[5].mode);
    createTempo(obj.soundSummary[6].tempo);
    createTimesignature(obj.soundSummary[7].timesignature);
  }
  var omg = function(wordInput){
    d3.select("#vis").select("svg")
    .remove();
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

    }

    $scope.try = {
      options: {
        chart: {
          type: 'line'
        },
        tooltip: {
          valueDecimals:0,
          valueSuffix:'',
          pointFormat: '{series.name}: {point.y}',
          headerFormat:"<span style=font-size: 10px>{point.key.a}, {point.key.c}</span><br/>",
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
  $scope.genererRelated = function(obj){
    $scope.gjort1 = false;
    var attributt = obj.name;

    if(attributt==="Tekstlig"){
      d3.select("#similar").select("svg")
      .remove();
      createSim($scope.related.tekst);

    }
    else if(attributt==="Akustisk"){
      d3.select("#similar").select("svg")
      .remove();
      createSim($scope.related.musikk);
    }
  }

  $scope.goToCompare = function(oid){
    $location.path('/compare/song/'+oid);
  };

  $scope.gotoSang = function(oid){
    console.log('/song/'+oid);
    $location.path('/song/'+oid);
  };
  $scope.gotoArtist = function(artistNavn){
    console.log('/artist/'+artistNavn);
    $location.path('/artist/'+artistNavn);
  };

  songs.query({_id:{$oid: $scope.oid }}).then(function(res){
    console.log(res);
    $scope.song = res[0];
    related.query({$and: [{title:res[0].title},{artist:res[0].artist} ]}).then(function(res2){
  $scope.related = res2[0];
      if(res2.length===0){
        $scope.hideit = true;
      }
      related.query({title:res2[0].tekst[0].target}).then(function(res3){
        for(var a = 0 ; a < res3[0].tekst.length; a++){
          $scope.related.tekst.push(res3[0].tekst[a]);
        }
        related.query({title:res2[0].tekst[1].target}).then(function(res4){
          for(var a = 0 ; a < res4[0].tekst.length; a++){
            $scope.related.tekst.push(res4[0].tekst[a]);
          }
          related.query({title:res2[0].tekst[2].target}).then(function(res5){
            for(var a = 0 ; a < res5[0].tekst.length; a++){
              $scope.related.tekst.push(res5[0].tekst[a]);
            }
            related.query({title:res2[0].tekst[3].target}).then(function(res6){
              for(var a = 0 ; a < res6[0].tekst.length; a++){
                $scope.related.tekst.push(res6[0].tekst[a]);
              }
              related.query({title:res2[0].tekst[4].target}).then(function(res7){
                for(var a = 0 ; a < res7[0].tekst.length; a++){
                  $scope.related.tekst.push(res7[0].tekst[a]);
                }
                createSim($scope.related.tekst);
              });
            });
          });
        });
      });
      related.query({title:res2[0].musikk[0].target}).then(function(res3){
        for(var a = 0 ; a < res3[0].musikk.length; a++){
          $scope.related.musikk.push(res3[0].musikk[a]);
        }
        related.query({title:res2[0].musikk[1].target}).then(function(res4){
          for(var a = 0 ; a < res4[0].musikk.length; a++){
            $scope.related.musikk.push(res4[0].musikk[a]);
          }
          related.query({title:res2[0].musikk[2].target}).then(function(res5){
            for(var a = 0 ; a < res5[0].musikk.length; a++){
              $scope.related.musikk.push(res5[0].musikk[a]);
            }
            related.query({title:res2[0].musikk[3].target}).then(function(res6){
              for(var a = 0 ; a < res6[0].musikk.length; a++){
                $scope.related.musikk.push(res6[0].musikk[a]);
              }
              related.query({title:res2[0].musikk[4].target}).then(function(res7){
                for(var a = 0 ; a < res7[0].musikk.length; a++){
                  $scope.related.musikk.push(res7[0].musikk[a]);
                }
              });
            });
          });
        });
      });


    });

    if($scope.song.soundSummary.length===0){
      console.log("null");
    }

    else{
      createBulletCharts($scope.song);
    }


    if($scope.song.bow.length===0){
      console.log("null");
      $scope.tekst = false;
    }

    else{
      console.log("kke null");
      $scope.song.bow = stopword.checkForStopWord(res[0].bow)
                  omg($scope.song.bow );
    }
    charts.query({ list: { $elemMatch: {"artist": $scope.song.artist, "title": $scope.song.title}}}).then(function(res2){
      console.log("det shit")
      console.log(res2);
      var values = [];
      var categorie = [];
      for(var a = 0 ; a<res2.length; a++){
        for(var i = 0 ; i<res2[a].list.length;i++){

          if(res2[a].list[i].artist===$scope.song.artist && res2[a].list[i].title===$scope.song.title){
            values.push(res2[a].list[i].position);
            categorie.push({a:res2[a].year, b: "chart/" + res2[a]._id.$oid, c:res2[a].week});
            break;
          }
        }
      }
      $scope.try.series[0].data = values;
      $scope.try.xAxis.categories = categorie;
      $scope.try.loading = false;
      createListet(res2.length);

    });

    summaryArtist.query({ artist:$scope.song.artist }).then(function(res){
      console.log(res);
      $scope.artist = res[0];
    });
  });

  var createSim = function(links){

    var linksene = angular.copy(links);

    var nodes = {};

    // Compute the distinct nodes from the links.
    linksene.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    var width = document.getElementById('similar').offsetWidth,
    height = 500;

    var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(linksene)
    .size([width, height])
    .linkDistance(175)
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
    .attr("r", 8)
    .style("fill", function(d){
      if(d.name.toLowerCase() === $scope.song.title.toLowerCase() && !$scope.gjort1){
        $scope.gjort1 = true;
        return d3.rgb('red');
      }

       });

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
