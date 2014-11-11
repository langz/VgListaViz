'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:ArtistsCtrl
* @description
* # ArtistsCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('ArtistsCtrl', function ($scope, summaryArtistTopAntall) {
  console.log('hei');

  summaryArtistTopAntall.all({ sort: {"antall": -1} }).then(function(s){
    console.log(s);
    $scope.summaryArtistTopAntall = s;
    var mainArray = [];
    for(var i=0;i<$scope.summaryArtistTopAntall.length;i++){
      var tempArray = [];
      tempArray.push($scope.summaryArtistTopAntall[i].artist);
      tempArray.push($scope.summaryArtistTopAntall[i].antall);
      mainArray.push(tempArray);
    }
$scope.try.loading = false;
$scope.try.series[0].data = mainArray;


  });

  $scope.try = {
    options: {
      chart: {
        type: 'column'
      },
      tooltip: {
        pointFormat: 'Antall ganger listet: <b>{point.y}</b>',
      },

      plotOptions: {
        column:{
          color:'#dd2027'
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
          return '<a href="#/artist/' + this.value + '"style="color:black;">' + this.value +
          '</a>';
        },
        useHTML:true
      }

    },
    yAxis: {
      min: 0,
      title: {
        text: 'Times Listed'
      }
    },


    series: [{
      name: 'Population',
      data:[],
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
      text: 'Vglista Topp 20 Top Listed Artists'
    },

    loading: true
  }
});
