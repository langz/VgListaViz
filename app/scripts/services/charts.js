'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.charts
 * @description
 * # charts
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('charts', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('charts');
  });
