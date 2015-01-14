'use strict';

/**
* @ngdoc function
* @name vgListaVizApp.controller:NavbarctrlCtrl
* @description
* # NavbarctrlCtrl
* Controller of the vgListaVizApp
*/
angular.module('vgListaVizApp')
.controller('CompareCtrl', function ($scope, songs) {

  $scope.song1 = function(inputText){
console.log("metoden da");

    songs.query({ $or: [{"artist": "/" + inputText +"/"}] }).then(function(s){
      console.log(s);
    });

  }
});
