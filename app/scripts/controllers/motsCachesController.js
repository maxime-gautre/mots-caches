'use strict';

angular.module('projectsApp')
  .controller('MotsCachesController', function ($scope, MotsCachesServiceCreation, MotsCachesServiceValidation) {
    
    var init = function() {
        $scope.myWords = MotsCachesServiceCreation.createWords();
        $scope.myTab = MotsCachesServiceCreation.getTab();
        $scope.ids = [];
        $scope.finished = false; 
    };

    init();

    $scope.submit = function() {
        if(!$scope.finished) {

    	   var resMatrix = MotsCachesServiceValidation.validation($scope.ids, $scope.myWords, $scope.myTab);
    	   if(resMatrix.length !== 0) {
                $scope.myTab = resMatrix[0];
    		    $scope.myWords = resMatrix[1];
                if(MotsCachesServiceValidation.getNbWordsFound() === $scope.myWords.length) {
                    $scope.finished = true;
                }
            }
        }
    };

    $scope.playAgain = function() {
        MotsCachesServiceValidation.resetNbWordsFound();
        init();
    };

  });
