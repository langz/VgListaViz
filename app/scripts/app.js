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
  .when('/data', {
    templateUrl: 'views/data.html',
    controller: 'DataCtrl'
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
  .when('/compare/:type/:id/', {
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
