'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ChartCtrl
* @description
* # ChartCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ChartCtrl',function ($scope, $routeParams) {
  $scope.chartname = $routeParams.chartnavn;

    Highcharts.setOptions({
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
            }
        }
    });

    //-------------------------------------------------------
    var chart1 = new Highcharts.Chart({
        chart:{renderTo:'container1'},
        xAxis:{categories:['Title 1']},
        yAxis:{
            max:100,
            labels:{y:10,style:{fontSize:'8px'}},
            plotBands:[]
        },
        series:[{name:'Gjennomsnitt',pointWidth:8.25,data:[70], color: 'rgba(103,103,103,.35)', zIndex:0},
                {name:'Verdi', pointWidth:8.5, data:[1], zIndex:1},
               {name:'Gjennomsnitt',pointWidth:8.25,data:[70], color: 'rgba(103,103,103,.35)', zIndex:0}]
    });


  });
