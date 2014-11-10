'use strict';

/**
 * @ngdoc function
 * @name vgListaVizApp.controller:NavbarctrlCtrl
 * @description
 * # NavbarctrlCtrl
 * Controller of the vgListaVizApp
 */
angular.module('vgListaVizApp')
  .controller('NavBarCtrl', function ($scope, $location) {

  $scope.isActive = function (viewLocation) {
    if(viewLocation === $location.path()){
      return true;
    }
    if(viewLocation==='/charts/'){
      if($location.path().indexOf(/honorar/) >-1){
        return true;
      }
    }
    if(viewLocation==='/artists'){
      if($location.path().indexOf(/adminhonorarinfo/) >-1){
        return true;
      }
    }
    if(viewLocation==='/songs'){
      if($location.path().indexOf(/adminedit/) >-1){
        return true;
      }
    }
    else{
      return false;
    }
  };
  });
