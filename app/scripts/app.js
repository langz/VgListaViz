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
'mongolabResourceHttp',
'highcharts-ng',
'ui.bootstrap'
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
  .when('/charts', {
    templateUrl: 'views/charts.html',
    controller: 'ChartsCtrl'
  })
  .when('/artists', {
    templateUrl: 'views/artists.html',
    controller: 'ArtistsCtrl'
  })
  .when('/artist/:artistnavn', {
    templateUrl: 'views/artist.html',
    controller: 'ArtistCtrl'
  })
  .when('/chart/:chartType/:oid', {
    templateUrl: 'views/chart.html',
    controller: 'ChartCtrl'
  })
  .when('/discover', {
    templateUrl: 'views/discover.html',
    controller: 'DiscoverCtrl'
  })
  .when('/compare', {
    templateUrl: 'views/compare.html',
    controller: 'CompareCtrl'
  })
  .when('/song/:oid', {
    templateUrl: 'views/song.html',
    controller: 'SongCtrl'
  })
  .when('/songs', {
    templateUrl: 'views/songs.html',
    controller: 'SongsCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
