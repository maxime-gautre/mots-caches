'use strict';

angular.module('projectsApp')
  .controller('MotsCachesController', function ($scope, MotsCachesServiceCreation, MotsCachesServiceValidation) {
    $scope.myWords = MotsCachesServiceCreation.getWords();
    $scope.myTab = MotsCachesServiceCreation.getTab();
    $scope.ids = [];

    $scope.submit = function() {
    	var resMatrix = MotsCachesServiceValidation.validation($scope.ids, $scope.myWords, $scope.myTab);
    	if(resMatrix.length !== 0) {
    		$scope.myTab = resMatrix;
    	}
    };
  });
