'use strict';

angular.module('mean').controller('TokamakController', ['$scope', 'Global',
  function($scope, Global, Tokamak) {
    $scope.global = Global;
    $scope.tokamak = {name:'tokamak'};

  }
]);