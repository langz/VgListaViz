'use strict';

/**
* @ngdoc service
* @name vgListaVizApp.api
* @description
* # api
* Factory in the vgListaVizApp.
*/
angular.module('vgListaVizApp')
.factory('api', function (charts, songs, summaryArtist, summaryArtistTop, summaryDecade, summaryYear) {
  // Service logic
  // ...

  var sanger = [];
  var lister = [];
  var artister = [];
  var artistTop = [];
  var decade = [];
  var aar = [];


  var getSongs = function(){
    if(sanger.length===0){
      songs.all().then(function(s){
        sanger = s;
        return sanger;
      });
    }
    else{
      return sanger;
    }
  };

  var getCharts = function(){
    if(lists.length===0){
      charts.all().then(function(s){
        lister = s;
        return lister;
      });
    }
    else{
      return lister;
    }
  };



  var getArtistsTop = function(){
    if(artistTop.length===0){
      summaryArtistTop.all().then(function(s){
        artistTop = s;
        return artistTop;
      });
    }
    else{
      return artistTop;
    }
  };

  var getArtists = function(){
    if(artister.length===0){
      summaryArtistTop.all().then(function(s){
        artister = s;
        return artister;
      });
    }
    else{
      return artister;
    }
  };

  var getDecades = function(){
    if(decade.length===0){
      summaryDecade.all().then(function(s){
        decade = s;
        return decade;
      });
    }
    else{
      return decade;
    }
  };

  var getYears = function(){
    if(summaryYear.length===0){
      summaryYear.all().then(function(s){
        aar = s;
        return aar;
      });
    }
    else{
      return aar;
    }
  };

  // Public API here
  return {
    getYears:getYears,
    getDecades:getDecades,
    getArtists:getArtists,
    getCharts:getCharts,
    getArtistsTop:getArtistsTop,
    getSongs:getSongs
  };
});
