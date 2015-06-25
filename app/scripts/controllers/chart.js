'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ChartCtrl
* @description
* # ChartCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ChartCtrl',function ($scope, $routeParams, summaryYear, charts, $location, songs, stopword) {
  $scope.chartType = $routeParams.chartType;
  $scope.oid = $routeParams.oid;
  $scope.isCollapsed = false;
  $scope.lydClick = true;
  $scope.chart = {};
  $scope.yearCharts = [];

  $scope.sortField = 'week';
  $scope.reverse = false;

  $scope.sortField2 = 'position';
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

  var danceabilityAvg = 0.5946363853683373;
  var durationAvg = 224.95823756669492;
  var energyAvg = 0.643722652721075;
  var loudnessAvg = -8.953935982092162;
  var modeAvg = 0.7065017816252117;
  var tempoAvg = 120.10330113014082;
  var hitlastingAvg = 7.2631578947368425;
  var timesignatureAvg=2;

  $scope.years = [1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967,
    1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
    2005, 2006, 2007, 2008, 2009, 2010];

    $scope.weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];


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
        createEnergy(obj.energy);
        createLoudness(Math.abs(obj.loudness));
        createMode(obj.mode);
        createTempo(obj.tempo);
        createTimesignature(obj.tempo);
      }
      var createBulletCharts2 = function(obj){
        createDanceability(obj.soundSummary[0].danceability);
        createDuration(obj.soundSummary[1].duration);
        createEnergy(obj.soundSummary[2].energy);
        createLoudness(Math.abs(obj.soundSummary[3].loudness));
        createMode(obj.soundSummary[4].mode);
        createTempo(obj.soundSummary[5].tempo);
        createTimesignature(obj.soundSummary[6].timesignature);
      }
      var omg = function(wordInput){
        d3.select("#vis").select("svg")
        .remove();
console.log(wordInput.length + " HHHEHRHE")
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
        $scope.goToCompare = function(oid){
          $location.path('/compare/chart/'+oid);
        };

        $scope.goToChartTypeChart = function(oid){

          console.log('/chart/chart/'+oid);
          $location.path('/chart/chart/'+oid);

        };
        $scope.goToChartTypeSummaryYear = function(aar){
          console.log(aar);
          summaryYear.query({year:parseInt(aar)}).then(function(res){
            console.log("SEAEAS");
            console.log(res);
            console.log('/chart/summaryYear/'+res[0]._id.$oid);
            $location.path('/chart/summaryYear/'+res[0]._id.$oid);
          });
        };

        $scope.goToSang = function(sangTittel, artistNavn){
          songs.query({$and: [{title:sangTittel},{artist:artistNavn} ]}).then(function(res){


            console.log(res);
            console.log('/song/'+res[0]._id.$oid);

            $location.path('/song/'+res[0]._id.$oid);
          });
        };
        $scope.gotoArtist = function(artistNavn){
          console.log('/artist/'+artistNavn);
          $location.path('/artist/'+artistNavn);
        };
        $scope.getChart = function(year, week){
          charts.query({ $and: [{"year": ""+year+""}, {"week": "Uke " +week}, {soundSummary: {$not: {$size: 0}}}]}).then(function(s){
            if(s.length===0){
              alert('Det er dessverre ikke publisert noen liste for denne uken');
            }
            else{
              s[0].title = s[0].year + " - " + s[0].week;
              $scope.goToChartTypeChart(s[0]._id.$oid);
            }

          });

        };

        if($scope.chartType==='summaryYear'){
          console.log('summaryYear');
          summaryYear.query({_id:{$oid:$scope.oid}}).then(function(res){
            $scope.chart = res[0];
            createBulletCharts(res[0]);
$scope.chart.lyricSummary = stopword.checkForStopWord(res[0].lyricSummary)
            omg($scope.chart.lyricSummary );
            console.log(res);
            console.log("Prøver spøøring : " + $scope.chart.year);
            $scope.selectedYear = $scope.years[res[0].year - 1960];
          });
        }
        else if($scope.chartType==='chart'){
          $scope.listeAktiv = true;
          charts.query({_id:{$oid:$scope.oid}}).then(function(res){
            console.log(res);
            $scope.selectedYear = $scope.years[res[0].year - 1960];
            $scope.selectedWeek = $scope.weeks[parseInt(res[0].week.substring(4, res[0].week.length))-1];
            $scope.chart = res[0];
            createBulletCharts2(res[0]);
            $scope.chart.lyricSummary = stopword.checkForStopWord(res[0].lyricSummary)
                        omg($scope.chart.lyricSummary );
            omg(res[0].lyricSummary);

          });
        }

      });
