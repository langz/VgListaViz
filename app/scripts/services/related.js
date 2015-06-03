'use strict';

/**
 * @ngdoc service
 * @name vgListaVizApp.charts
 * @description
 * # charts
 * Factory in the vgListaVizApp.
 */
angular.module('vgListaVizApp')
.factory('related', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('related');
  });
