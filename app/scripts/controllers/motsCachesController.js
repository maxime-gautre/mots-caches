'use strict';

angular.module('projectsApp')
  .controller('MotsCachesController', function ($scope, MotsCachesService) {
    $scope.myWords = MotsCachesService.getWords();
    $scope.myTab = MotsCachesService.getTab();
    $scope.ids = [];
  });
