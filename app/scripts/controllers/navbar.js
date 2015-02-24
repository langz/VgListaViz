'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('NavBarCtrl', function ($scope, $location, songs, summaryArtist) {
  $scope.choice = '';
  $scope.choices = [
    'Sang',
    'Artist'
  ];
  $scope.isActive = function (viewLocation) {
    var chart ='/chart/';
    if(viewLocation === $location.path()){
      return true;
    }
    else if(viewLocation==='/chart/'){
      if($location.path().indexOf(/chart/) >-1 && !($location.path().indexOf(/compare/) >-1)){
        return true;
      }
    }
    else if(viewLocation==='/artist/'){
      if($location.path().indexOf(/artist/) >-1 && !($location.path().indexOf(/compare/) >-1)){
        return true;
      }
    }
    else if(viewLocation==='/song/'){
      if($location.path().indexOf(/song/) >-1 && !($location.path().indexOf(/compare/) >-1)){

        return true;
      }
    }
    else if(viewLocation==='/compare/'){
      if($location.path().indexOf(/compare/) >-1){
        return true;
      }
    }
    else{
      return false;
    }
  };
  $scope.search = function(inputText){

    if($scope.choice==='Sang'){
      return songs.query({$and:[{title:{$regex:inputText, $options : 'i'}}, {soundSummary: {$not: {$size: 0}}}]}, { limit: 10 })
      .then(function(s){
        return s.map(function(item){
          item.info = item.title;
          item.type='sang';
          return item;
        });
      });
    }
    else if($scope.choice==='Artist'){
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

  $scope.gotoSang = function(oid){
    console.log('/song/'+oid);
    $location.path('/song/'+oid);
  };
  $scope.gotoArtist = function(artistNavn){
    console.log('/artist/'+artistNavn);
    $location.path('/artist/'+artistNavn);
  };

  $scope.onSelect = function(item){
    console.log(item);
    if($scope.choice==='Sang'){
      $scope.gotoSang(item._id.$oid);
    }
    else if($scope.choice==='Artist'){
      $scope.gotoArtist(item.artist);
    }
  }
});
