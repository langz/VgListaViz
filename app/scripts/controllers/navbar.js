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
    if(viewLocation==='/chart/'){
      if($location.path().indexOf(/chart/) >-1){
        return true;
      }
    }
    if(viewLocation==='/artist/'){
      if($location.path().indexOf(/artist/) >-1){
        return true;
      }
    }
    if(viewLocation==='/song/'){
      if($location.path().indexOf(/song/) >-1){
        return true;
      }
    }
    else{
      return false;
    }
  };
  });
