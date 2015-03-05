'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('CompareCtrl', function ($scope, songs, summaryArtist, charts, $http, $routeParams) {
  console.log('hei');
  if($routeParams.type==="empty"){
    $scope.compType = 'artist';
  }
  else{
    $scope.compType = $routeParams.type;
    if($routeParams.type==="artist"){

      summaryArtist.query({_id:{$oid: $routeParams.id}}).then(function(res){
        var obj = res[0];
        obj.type=$routeParams.type;
        $scope.asyncSelected1 = res[0].artist;
        $scope.onSelect(obj, 0);
      });

    }
    else if($routeParams.type==="song"){
      songs.query({_id:{$oid: $routeParams.id}}).then(function(res){
        var obj = res[0];
        obj.type=$routeParams.type;
        $scope.asyncSelected1 = res[0].title + " - " + res[0].artist ;
        $scope.onSelect(obj, 0);

      });
    }
    else if($routeParams.type==="chart"){
      charts.query({_id:{$oid: $routeParams.id}}).then(function(res){
        res[0].title = res[0].year + " - " + res[0].week;
        var obj = res[0];
        $scope.changeComparison(obj, 0);
        obj.type=$routeParams.type;
        $scope.selectedYear = $scope.years[parseInt(obj.year) - 1960];
        $scope.selectedWeek = $scope.weeks[parseInt(obj.week.substring(4, obj.week.length))-1];
        $scope.asyncSelected1 = res[0].title + " - " + res[0].artist ;
        $scope.onSelect(obj, 0);

      });
    }
  }


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

      var sanglistetMax = 57

      var bestplassMax = 20;

      var antallunikesangerMax = 33;


      $scope.getChart = function(year, week, number){
        charts.query({ $and: [{"year": ""+year+""}, {"week": "Uke " +week}, {soundSummary: {$not: {$size: 0}}}]}).then(function(s){
          if(s.length===0){
            alert('There is unfortunately not published a chart on this week');
          }
          else{
            s[0].title = s[0].year + " - " + s[0].week;
            $scope.createCloud(s[0].lyricSummary, number);
            $scope.changeComparison(s[0], number);
          }

        });

      };

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
        else if(category==='Antall uker'){
          divide = artistlistetMax;
          return ((value/divide) * 100)*min;
        }
        else if(category==='Antall Uker'){
          divide = sanglistetMax;
          return ((value/divide) * 100)*min;
        }
        else if(category==="Beste plassering"){
          divide = bestplassMax;
          return ((value/divide) * 100)*min;
        }
        else if(category==='Antall sanger'){
          divide = antallunikesangerMax;
          return ((value/divide) * 100)*min;
        }

        else{
          return value;
        }
      };

      $scope.song1 = function(inputText){

        if($scope.compType==='song'){
          return songs.query({$and:[{title:{$regex:inputText, $options : 'i'}}, {soundSummary: {$not: {$size: 0}}}]}, { limit: 10 })
          .then(function(s){
            return s.map(function(item){
              item.info = item.title + " - " + item.artist;
              item.type='song';
              return item;
            });
          });
        }
        if($scope.compType==='artist'){
          return summaryArtist.query({$and:[{artist:{$regex:inputText, $options : 'i'}}, { danceability: { $exists: true, $nin: [ 0 ] } }]}, { limit: 10 })
          .then(function(s){
            return s.map(function(item){
              item.info = item.artist;
              item.type='artist';
              return item;
            });
          });
        }
      };
      $scope.createCloud = function(bow, number){
        console.log(bow);
        if(bow.length===0){
          console.log(bow.length + '=== 0');
          if(number===0){
            d3.select("#vis").select("svg")
            .remove();
            $scope.venVisible = true;
            console.log('$scope.venVisible er:' +$scope.venVisible );

          }
          else if(number===1){
            d3.select("#vis1").select("svg")
            .remove();
            $scope.rightVisible = true;
            console.log('$scope.rightVisible er:' +$scope.rightVisible );

          }
        }
        else{
          console.log("Ikke tom nå da");
          if(number===0){
            d3.select("#vis").select("svg")
            .remove();
            $scope.venVisible = false;
            console.log('$scope.venVisible er:' +$scope.venVisible );
            omg(bow);
          }
          else if(number===1){
            d3.select("#vis1").select("svg")
            .remove();
            $scope.rightVisible = false;
            console.log('$scope.rightVisible er:' +$scope.rightVisible );
            omg1(bow);
          }
        }
      }
      $scope.onSelect = function(inp, number) {
        if(inp.type==='song'){
          $scope.createCloud(inp.bow, number);
          $scope.changeComparison(inp,number);
          console.log(inp);
        }
        else if(inp.type==='artist'){
          $scope.createCloud(inp.bow, number);
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
        if(obj.type==="song"){
          categorie.push("Beste plassering");
          data.push({'y':$scope.percentageOf(obj.bestPos, "Beste plassering", number), 'color':color});
          categorie.push("Antall Uker");
          data.push({'y':$scope.percentageOf(obj.antall, "Antall Uker", number), 'color':color});
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
        data.push({'y':$scope.percentageOf(obj.antall, "Antall uker", number), 'color':color});
        data.push({'y':$scope.percentageOf(obj.antallunikesanger, "Antall sanger", number), 'color':color});

        categorie.push('Dansbarhet');
        categorie.push('Varighet');
        categorie.push('Energi');
        categorie.push('Nøkkel');
        categorie.push('Lydstyrke');
        categorie.push('Modal Skala');
        categorie.push('Tempo');
        categorie.push('Taktart');
        categorie.push("Uker på listen");
        categorie.push("Antall sanger");
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
        clearAll();
        clearBothSVGs();
        $scope.compType = inp;
      };

      $scope.compareConfig = {
        options: {
          legend: { enabled: false},
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
              stacking: 'normal',
              // dataLabels: {
              //   enabled: true,
              //   borderColor:'black',
              //   color:'white',
              //   formatter: function () {
              //     return Highcharts.numberFormat(Math.abs(getValue(this.point.y, this.point.category)), 1);
              //   }
              // }
            },
            column: {
              colorByPoint: false
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

        series: [],
        exporting: { enabled: false }
      };
      var clearAll = function(){
        $scope.compareConfig.series=[];
      }
      var getValue = function(value, category){
        if(category==='Taktart'){
          return (value/100) * timesignatureMax;
        }
        else if(category==='Tempo'){
          return (value/100) * tempoMax;
        }
        else if(category==='Modal Skala'){
          return (value/100) * modeMax;
        }
        else if(category==='Lydstyrke'){
          return (value/100) * loudnessMax;
        }
        else if(category==='Nøkkel'){
          return (value/100) * keyMax;
        }
        else if(category==='Energi'){
          return (value/100) * energyMax;
        }
        else if(category==='Varighet'){
          return (value/100) * durationMax;
        }
        else if(category==='Dansbarhet'){
          return (value/100) * danceabilityMax;
        }
        else if(category==='Uker på listen'){
          return (value/100) * artistlistetMax;
        }
        else if(category==="Beste plassering"){
          return (value/100) * bestplassMax;
        }
        else if(category==='Uker på listen'){
          return (value/100) * sanglistetMax;
        }
        else if(category==='Unike sanger'){
          return (value/100) * antallunikesangerMax;
        }
        else if(category==='Antall sanger'){
          return (value/100) * antallunikesangerMax;
        }
        else{
          return value;
        }
      };
      var getText = function(category){

        if(category==='Lydstyrke'){
          return "dB";
        }
        else if(category==='Varighet'){
          return "s";
        }
        else if(category==='Uker på listen'){
          return " ganger";
        }
        else{
          return '';
        }
      };

      var vis;
      var svg;
      var layout;
      var max;
      var fontSize;
      var w;
      var h;
      var fill;

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

        };

        var vis;
        var svg;
        var layout;
        var max;
        var fontSize;
        var w;
        var h;
        var fill;

        var omg1 = function(wordInput){
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
          svg = d3.select("#vis1").append("svg")
          .attr("width", w)
          .attr("height", h);

          vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

          update();

          window.onresize = function(event) {
            d3.select("#vis1").select("svg")
            .remove();
            svg = d3.select("#vis1").append("svg")
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

          };
          var clearBothSVGs = function(){
            d3.select("#vis").select("svg")
            .remove();
            d3.select("#vis1").select("svg")
            .remove();
          }
        });
