'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('CompareCtrl', function ($scope, songs, $http) {
  console.log('sadas');
  $scope.song1 = function(inputText){
    console.log("metoden da");

    return songs.query({ $or: [{title:{$regex:inputText, $options : 'i'}},
  {artist:{$regex:inputText, $options : 'i'}}]}, { limit: 10 })
  .then(function(s){
    return s.map(function(item){
      return item.title + " - " + item.artist ;
    });
  });

};
$scope.getLocation = function(val) {
  return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: val,
      sensor: false
    }
  }).then(function(response){
    return response.data.results.map(function(item){
      return item.formatted_address;
    });
  });
};

});
