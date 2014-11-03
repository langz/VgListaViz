'use strict';

/**
* @ngdoc overview
* @name vgListaVizApp
* @description
* # vgListaVizApp
*
* Main module of the application.
*/
angular
.module('vgListaVizApp', [
'ngAnimate',
'ngResource',
'ngRoute',
'mongolabResourceHttp'
])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
