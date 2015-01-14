'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('CompareCtrl', function ($scope, songs, summaryArtist, $http) {
  $scope.compType = 'Artist';
  console.log('sadas');
  $scope.song1 = function(inputText){

    if($scope.compType==='Song'){
      return songs.query({title:{$regex:inputText, $options : 'i'}}, { limit: 10 })
      .then(function(s){
        return s.map(function(item){
          item.info = item.title + " - " + item.artist;
          return item;
        });
      });
    }
    if($scope.compType==='Artist'){
      return summaryArtist.query({artist:{$regex:inputText, $options : 'i'}}, { limit: 10 })
      .then(function(s){
        return s.map(function(item){
          item.info = item.artist;
          return item;
        });
      });
    }
    if($scope.compType==='Chart'){

    }



    //   return songs.query({ $or: [{title:{$regex:inputText, $options : 'i'}},
    // {artist:{$regex:inputText, $options : 'i'}}]}, { limit: 10 })
    // .then(function(s){
    //   return s.map(function(item){
    //     item.info = item.title + " - " + item.artist;
    //     return item;
    //   });
    // });

  };
  $scope.onSelect = function(inp, number) {
    $scope.changeComparison(inp,number);
  };
  $scope.changeComparison = function(obj, number){
    var categories = [];
    var data = [];
    for(var a = 0 ; a < obj.soundSummary.length; a++){
      for(var propName in obj.soundSummary[a]){
        categories.push(propName);
        data.push(obj.soundSummary[a][propName]);
      }
    }
    console.log( categories);
    console.log( data);
  }
  $scope.changeCompType = function(inp){
    $scope.asyncSelected1 = null;
    $scope.asyncSelected2 = null;

    $scope.compType = inp;
  }
  var categories = ['0-4', '5-9', '10-14', '15-19',
  '20-24', '25-29', '30-34', '35-39', '40-44',
  '45-49', '50-54', '55-59', '60-64', '65-69',
  '70-74', '75-79', '80-84', '85-89', '90-94',
  '95-99', '100 + '];
  $scope.compareConfig = {
    options: {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Population pyramid for Germany, midyear 2010'
      },
      subtitle: {
        text: 'Source: www.census.gov'
      },
      xAxis: [{
        categories: categories,
        reversed: false,
        labels: {
          step: 1
        }
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0,
        labels: {
          step: 1
        }
      }],
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      }},
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function () {
            return '';
          }
        },
        min: -4000000,
        max: 4000000
      },



      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
          'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
        }
      },

      series: [{
        name: 'Male',
        data: [-1746181, -1884428, -2089758, -2222362, -2537431, -2507081, -2443179,
        -2664537, -3556505, -3680231, -3143062, -2721122, -2229181, -2227768,
        -2176300, -1329968, -836804, -354784, -90569, -28367, -3878]
      }, {
        name: 'Female',
        data: [1656154, 1787564, 1981671, 2108575, 2403438, 2366003, 2301402, 2519874,
        3360596, 3493473, 3050775, 2759560, 2304444, 2426504, 2568938, 1785638,
        1447162, 1005011, 330870, 130632, 21208]
      }]


    };
  });
