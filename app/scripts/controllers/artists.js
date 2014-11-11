'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistsCtrl
* @description
* # ArtistsCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistsCtrl', function ($scope, summaryArtist) {
  console.log('hei');

  summaryArtist.all().then(function(s){
    console.log(s);
  });

  $scope.try = {
    options: {
      chart: {
        type: 'column'
      },
      tooltip: {
        valueDecimals:2,
        valueSuffix:'',
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.y}'
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
          return '<a href="#/artist/' + this.value + '">' + this.value +
          '</a>';
        },
        useHTML:true
      }

    },
    yAxis: {
      min: 0,
      title: {
        text: 'Population (millions)'
      }
    },
    tooltip: {
      pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
    },

    series: [{
      name: 'Population',
      data: [
      ['Shanghai', 23.7],
      ['Lagos', 16.1],
      ['Instanbul', 14.2],
      ['Karachi', 14.0],
      ['Mumbai', 12.5],
      ['Moscow', 12.1],
      ['São Paulo', 11.8],
      ['Beijing', 11.7],
      ['Guangzhou', 11.1],
      ['Delhi', 11.1],
      ['Shenzhen', 10.5],
      ['Seoul', 10.4],
      ['Jakarta', 10.0],
      ['Kinshasa', 9.3],
      ['Tianjin', 9.3],
      ['Tokyo', 9.0],
      ['Cairo', 8.9],
      ['Dhaka', 8.9],
      ['Mexico City', 8.9],
      ['Lima', 8.9]
      ],
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
        }
      }
    }],
    title: {
      text: 'Vglista Topp 20 Summary'
    },

    loading: false
  }
});
