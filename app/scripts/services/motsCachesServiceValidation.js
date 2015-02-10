'use strict';

angular.module('projectsApp')
  .service('MotsCachesServiceValidation', function () {

  		this.validation = function(selectedTab, listOfWords, matrix) {
			var idCells = selectedTab.map(function (el){
				var array = el.split('-');
				return {x: array[1], y: array[2]};
			});
			var submittedWord = getWord(idCells, matrix);
			if(checkValidation(submittedWord, listOfWords)) {
				return updateMatrix(idCells, matrix);
			} else {
				return [];
			}
  		};

  		var getWord = function(idCells, matrix) {
  			var array = idCells.map(function (el){
  				return matrix[el.x][el.y].value;
  			});

  			return array.join('');
  		};

  		var updateMatrix = function(idCells, matrix) {
  			idCells.forEach(function (el){
  				matrix[el.x][el.y].found = true;
  			});

  			return matrix;
  		};

  		var checkValidation = function(submittedWord, listOfWords) {

  			function reverse(s){
			    return s.split('').reverse().join('');
			}
  			if(listOfWords.indexOf(submittedWord) === -1) {
  				var reversed = reverse(submittedWord);
  				if(listOfWords.indexOf(reversed) === -1) {
  					return false;
  				} else {
  					return true;
  				}
  			} else {
  				return true;
  			}
  		};
});