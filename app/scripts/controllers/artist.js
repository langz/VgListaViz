'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistCtrl
* @description
* # ArtistCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistCtrl',function ($scope, $routeParams, $location, summaryArtist, charts, songs) {
  $scope.isCollapsed = false;
  $scope.lydClick = true;
  $scope.artist = {};
  $scope.artistnavn = $routeParams.artistnavn;
  $scope.tekst = true;
  $scope.lister = [];
  $scope.sortField='position';
  $scope.reverse = false;
  $scope.sortField2='title';
  $scope.reverse2 = false;
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
    Highcharts.setOptions(optionsNormal);
    var danceability = new Highcharts.Chart({
      chart:{renderTo:'danceability'},
      xAxis:{categories:['Danceability']},
      yAxis:{
        max:danceabilityMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[danceabilityAvg], color: 'rgba(103,103,103,.35)'},
      {name:'Verdi', pointWidth:7, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[danceabilityAvg], color: 'rgba(103,103,103,.35)'}]
    });
  }
  var createDuration = function(verdi){
    Highcharts.setOptions(optionsNormal);
    var duration = new Highcharts.Chart({
      chart:{renderTo:'duration'},
      xAxis:{categories:['Duration']},
      yAxis:{
        max:durationMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
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
      }
    });
  }
  var createListet = function(verdi){
    Highcharts.setOptions(optionsNormal);
    var duration = new Highcharts.Chart({
      chart:{renderTo:'listet'},
      xAxis:{categories:['Antall uker']},
      yAxis:{
        max:numWeeksMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
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
      }
    });
  }
  var createSanger = function(verdi){
    Highcharts.setOptions(optionsNormal);
    var duration = new Highcharts.Chart({
      chart:{renderTo:'sanger'},
      xAxis:{categories:['Antall Sanger']},
      yAxis:{
        max:numSongsMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
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
      }
    });
  }
  var createEnergy = function(verdi){
    Highcharts.setOptions(optionsNormal);
    var energy = new Highcharts.Chart({
      chart:{renderTo:'energy'},
      xAxis:{categories:['Energy']},
      yAxis:{
        max:energyMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[energyAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[energyAvg], color: 'rgba(103,103,103,.35)', zIndex:0}]
    });
  }
  var createLoudness = function(verdi){
    Highcharts.setOptions(optionsLoudness);
    var loudness = new Highcharts.Chart({
      chart:{renderTo:'loudness'},
      xAxis:{categories:['Loudness']},
      yAxis:{
        max:-loudnessMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
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
      }
    });
  }
  var createMode = function(verdi){
    Highcharts.setOptions(optionsNormal);
    var mode = new Highcharts.Chart({
      chart:{renderTo:'mode'},
      xAxis:{categories:['Mode']},
      yAxis:{
        max:modeMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
      },
      series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[modeAvg], color: 'rgba(103,103,103,.35)', zIndex:0},
      {name:'Verdi', pointWidth:8.5, data:[verdi], zIndex:1},
      {name:'Gjennomsnitt',pointWidth:8.25,data:[modeAvg], color: 'rgba(103,103,103,.35)', zIndex:0}]
    });
  }
  var createTempo = function(verdi){
    Highcharts.setOptions(optionsNormal);
    var tempo = new Highcharts.Chart({
      chart:{renderTo:'tempo'},
      xAxis:{categories:['Tempo']},
      yAxis:{
        max:tempoMax,
        labels:{y:10,style:{fontSize:'8px'}},
        plotBands:[]
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
      }
    });
  }
  var createBulletCharts = function(obj){
    createDanceability(obj.danceability);
    createDuration(obj.duration);
    createListet(obj.antall);
    createSanger(obj.antallunikesanger);
    createEnergy(obj.energy);
    createLoudness(Math.abs(obj.loudness));
    createMode(obj.mode);
    createTempo(obj.tempo);
  }
  var omg = function(wordInput){
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

    $scope.goToChartTypeChart = function(oid){

      console.log('/chart/chart/'+oid);
      $location.path('/chart/chart/'+oid);

    };

    $scope.gotoSang = function(oid){
      console.log('/song/'+oid);
      $location.path('/song/'+oid);
    };
    $scope.goToSangTitle = function(sangTittel, artistNavn){
      songs.query({$and: [{title:sangTittel},{artist:artistNavn} ]}).then(function(res){


        console.log(res);
      console.log('/song/'+res[0]._id.$oid);

      $location.path('/song/'+res[0]._id.$oid);
    });
    };
    summaryArtist.query({ artist:$scope.artistnavn }).then(function(res){
      console.log(res);
      createBulletCharts(res[0]);
      $scope.artist = res[0];


      if($scope.artist.bow.length===0){
        console.log("bow er null");
        $scope.tekst = false;
      }
      else{
        console.log("kke null");
        omg(res[0].bow);
      }


      charts.query({ list: { $elemMatch: {"artist": $scope.artist.artist}}}).then(function(res2){
        for(var a = 0 ; a<res2.length; a++){
            for(var i = 0 ; i<res2[a].list.length;i++){

              if(res2[a].list[i].artist===$scope.artist.artist){
                $scope.lister.push({position:res2[a].list[i].position, artist: res2[a].list[i].artist, title: res2[a].list[i].title, week: res2[a].week, year:res2[a].year, oid:res2[a]._id.$oid});
                break;
              }
            }
        }


      });
    });

  });
