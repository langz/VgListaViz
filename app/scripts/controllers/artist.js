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
var vis;
var svg;
var layout;
var max;
var fontSize;
var w;
var h;
var fill;
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


    omg(s[0].bow.slice(0,100));
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


    $scope.spiderweb = {
      options:{
        chart: {
          polar: true,
          type: 'line'
        },

        title: {
          text: '',
          x: -80
        },

        pane: {
          size: '80%'
        },

        xAxis: {
          categories: ['Danceability', 'Duration', 'Energy', 'Loudness',
          'Tempo', 'Timesignature'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },

        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0, max:1,
          labels: {
            enabled: false
          },
        },

        tooltip: {

          pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y} {point.value}</b><br/>'
        },

        legend:{enabled:false},

      },


      series: [{
        name: 'Gjennomsnitt',
        data: [{y:0.1, value:2}, {y:0.1, value:2}, {y:0.1, value:2}, {y:0.1, value:2}, {y:0.1, value:2}, {y:0.1, value:2}],
        pointPlacement: 'on', color:'red'
      }, {
        name: 'Uke 23',
        data: [{y:0.5}, {y:0.22}, {y:0.85}, {y:0.81}, {y:0.70}, {y:0.4}],
        pointPlacement: 'on',
        color:'black'
      }]

    };

    // var setupTextViz = function(wordInput){
    //   var fill = d3.scale.category20();
    //
    //   d3.layout.cloud().size([300, 300])
    //   .words(wordInput.map(function(d) {
    //     return {text: d[0], size: d[1] };
    //   }))
    //   .padding(5)
    //   .rotate(function() { return ~~(Math.random() * 5) * 30 - 60; })
    //   .font("Impact")
    //   .fontSize(function(d) { return d.size; })
    //   .on("end", draw)
    //   .start();
    //
    //   function draw(words) {
    //     d3.select("#test").append("svg")
    //     .attr("width", '100%')
    //     .attr("height", '100%')
    //     .append("g")
    //     .attr("transform", "translate(150,150)")
    //     .selectAll("text")
    //     .data(words)
    //     .enter().append("text")
    //     .style("font-size", function(d) { return d.size + "px"; })
    //     .style("font-family", "Impact")
    //     .style("fill", function(d, i) { return fill(i); })
    //     .attr("text-anchor", "middle")
    //     .attr("transform", function(d) {
    //       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    //     })
    //     .text(function(d) { return d.text; });
    //   }
    //
    // };
var omg = function(wordInput){
fill = d3.scale.category20b();

w = document.getElementById('vis').offsetWidth,
  h = 200;


  console.log(document.getElementById('vis').offsetWidth);
  console.log(document.getElementById('vis').offsetHeight);



  max,
  fontSize;

layout = d3.layout.cloud()
  .timeInterval(Infinity)
  .size([w, h])
  .fontSize(function(d) {
    return fontSize(+d[1]);
  })
  .text(function(d) {
    return d[0];
  })
  .on("end", draw);
  console.log( w + " " + h)
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
    h = 200;

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

      vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
    }

    function update() {
      layout.font('impact').spiral('archimedean');
      fontSize = d3.scale['sqrt']().range([10, 100]);
      if (wordInput.length){
        fontSize.domain([1, d3.max(wordInput, function(d) {
          return d[1];
        })]);
      }
      layout.stop().words(wordInput).start();
    }

}
  });
