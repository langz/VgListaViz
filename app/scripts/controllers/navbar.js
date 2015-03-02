'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('NavBarCtrl', function ($scope, $location, songs, summaryArtist, charts) {
  $scope.asyncSelected1 = null;
  $scope.choice = '';
  $scope.choices = [
    'Sang',
    'Artist',
    'Liste'
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
$scope.clearField = function(){
console.log('sesae')
$scope.asyncSelected1='';
}
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
  $scope.years = ['År',1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967,
    1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991,
    1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
    2005, 2006, 2007, 2008, 2009, 2010];

    $scope.weeks = ['Uke',1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
      24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

      $scope.ar = 'År';
      $scope.uke = 'Uke';
      $scope.onChangeSelect = function(year, week){
        if (year==='År' || week ==='Uke'){

        }
        else{
          $scope.getChart(year, week);
        }
      };

      $scope.getChart = function(year, week){
$scope.selectLoad = true;

        charts.query({ $and: [{"year": ""+year+""}, {"week": "Uke " +week}, {soundSummary: {$not: {$size: 0}}}]}).then(function(s){
          if(s.length===0){
            alert('Det er dessverre ikke publisert noen liste for denne uken');
          }
          else{
$scope.selectLoad = false;
            s[0].title = s[0].year + " - " + s[0].week;
            $scope.goToChartTypeChart(s[0]._id.$oid);
          }

        });

      };
      $scope.goToChartTypeChart = function(oid){

        $location.path('/chart/chart/'+oid);

      };
$scope.selectLoad = false;


    });
