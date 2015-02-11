'use strict';

angular.module('projectsApp')
  .service('MotsCachesServiceValidation', function () {

  		this.validation = function(selectedTab, listOfWords, matrix) {
  			var idCells = selectedTab.map(function (el) {
  				var array = el.split('-');
  				return {x: array[1], y: array[2]};
  			});
  			var submittedWord = getWord(idCells, matrix);
        var index = checkValidation(submittedWord, listOfWords);
  			if(index !== -1) {
  				return [updateMatrix(idCells, matrix), updateWords(index, listOfWords)];
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
  			idCells.forEach(function (el) {
  				matrix[el.x][el.y].found = true;
  			});

  			return matrix;
  		};

      var updateWords = function(index, listOfWords) {
        listOfWords[index].found = true;
        return listOfWords;
      };

  		var checkValidation = function(submittedWord, listOfWords) {

  			function reverse(s) {
			    return s.split('').reverse().join('');
			  }
  			
        var listValues = listOfWords.map(function (el){ return el.value; });
        var index = listValues.indexOf(submittedWord); 
        if(index === -1) {
  				var reversed = reverse(submittedWord);
  				return listValues.indexOf(reversed);
  			} else {
  				return index;
  			}
  		};
});