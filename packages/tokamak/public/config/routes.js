'use strict';

angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('Tokamak', {
        url: '/tokamak/example',
        templateUrl: 'tokamak/views/index.html'
      })
  }
])