
(function () {

	var myWords = ["voiture", "bruler", "accueil", "rouge", "dinosaure", "eclair", "misere", "jambon","visage","javascript"].map(function(el){ return el.toUpperCase()});
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // var sumWordsLength = myWords.reduce(function(a, b){ return a + b.length}, 0);
	// var avgWordsLength = sumWordsLength / myWords.length;
	var avgWordsLength = myWords.reduce(function(p, c, i){return p + (c.length-p) / (i+1)},0);
	var tab = myWords.map(function (el) { return el.split("");});

  var initMatrix = function (size) {

    var tab = [];
    for (var i = 0; i < size; ++i) {
      tab[i] = [];
      for (var j = 0; j < size; ++j) {
        tab[i][j] = "*";
      }
    }
    return tab;
  };

  var fillMatrix = function (ntab, size) {

    for (var i = 0; i < size; ++i) {
      for (var j = 0; j < size; ++j) {
        if (ntab[i][j] == "*") {
          ntab[i][j] = letters.charAt(Math.floor(Math.random() * letters.length));
        }
      }
    }
  };

  var afficher = function (tab) {

    var str;
    for (var i = 0; i < tab.length; ++i) {
      str = '';
      var tabEl = tab[i];
      for (var j = 0; j < tabEl.length; ++j) {
        str += tabEl[j] + '-';
      }
      console.log(str);
    }
  };

	function shuffle(array) {
	  var m = array.length, t, i;
	  while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	  }
	  return array;
}

  var calculDistanceMax = function (objWords, sizeMatrix) {

    function compare(a, b) {
      if (a.dist < b.dist)
        return 1;
      if (a.dist > b.dist)
        return -1;
      return 0;
    }


    //find Max distance of this word
    var distances = [];
    for (j = 2; j < sizeMatrix; ++j) {
      for (h = 2; h < sizeMatrix; ++h) {
        // calcul distance entre word et (j,h)
        var sumDist = objWords.map(function (objWord) {

          var dist = (objWord.centroide[0] - j) * (objWord.centroide[0] - j) + (objWord.centroide[1] - h) * (objWord.centroide[1] - h);
          return dist;
        }).reduce(function (valPrec, valCourante) {
          return valPrec + valCourante
        });

        distances.push({dist: sumDist, x: j, y: h});
      }
    }

    return distances.sort(compare);
  };


  var getAcceptablePosition = function (objDist, word, sizeMatrix) {

    var contains = function (xmin, xmax, ymin, ymax) {
      return (objDist.x >= xmin && objDist.x <= xmax && objDist.y >= ymin && objDist.y <= ymax);
    };

    var arrayRes = [];
    var isHoriz = contains(0, sizeMatrix - 1, 0, sizeMatrix - word.length);
    var isHorizInverse = contains(0, sizeMatrix - 1, word.length - 1, sizeMatrix - 1);
    var isVertical = contains(0, sizeMatrix - word.length, 0, sizeMatrix - 1);
    var isVerticalInverse = contains(word.length - 1, sizeMatrix - 1, 0, sizeMatrix - 1);
    var isDiagonaleDroite = contains(0, sizeMatrix - word.length, 0, sizeMatrix - word.length);
    var isDiagonaleGauche = contains(0, sizeMatrix - word.length, word.length - 1, sizeMatrix - 1);
    var isDiagonaleInverseDroite = contains(word.length - 1, sizeMatrix - 1, 0, sizeMatrix - word.length);
    var isDiagonaleInverseGauche = contains(word.length - 1, sizeMatrix - 1, word.length - 1, sizeMatrix - 1);

    if (isHoriz) {
      arrayRes.push("Horizontal");
    }

    if (isHorizInverse) {
      arrayRes.push("Horizontal-inverse");
    }

    if (isVertical) {
      arrayRes.push("Vertical");
    }

    if (isVerticalInverse) {
      arrayRes.push("Vertical-inverse");
    }

    if (isDiagonaleDroite) {
      arrayRes.push("Diagonale-droite");
    }

    if (isDiagonaleGauche) {
      arrayRes.push("Diagonale-gauche");
    }

    if (isDiagonaleInverseDroite) {
      arrayRes.push("Diagonale-inverse-droite");
    }

    if (isDiagonaleInverseGauche) {
      arrayRes.push("Diagonale-inverse-gauche");
    }

    return arrayRes;
  };

  var getCoordHorizontal = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Horizontal";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x, obj.y + (obj.word.length - 1) / 2];

    return obj;
  };

  var getCoordHorizontalInverse = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Horizontal-inverse";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x, obj.y - (obj.word.length - 1) / 2];
    return obj;
  };

  var getCoordVertical = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Vertical";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x + (obj.word.length - 1) / 2, obj.y];
    return obj;

  };

  var getCoordVerticalInverse = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Vertical-inverse";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x - (obj.word.length - 1) / 2, obj.y];
    return obj;

  };

  var getCoordDiagonaleDroite = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Diagonale-droite";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x + (obj.word.length - 1) / 2, obj.y + (obj.word.length - 1) / 2];

    return obj;
  };

  var getCoordDiagonaleGauche = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Diagonale-gauche";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x + (obj.word.length - 1) / 2, obj.y - (obj.word.length - 1) / 2];
    return obj;
  };

  var getCoordDiagonaleInverseDroite = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Diagonale-inverse-droite";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x - (obj.word.length - 1) / 2, obj.y + (obj.word.length - 1) / 2];

    return obj;
  };

  var getCoordDiagonaleInverseGauche = function (word, sizeMatrix, x, y) {

    var obj = {};
    obj.word = word;
    obj.sens = "Diagonale-inverse-gauche";
    obj.x = x;
    obj.y = y;
    obj.centroide = [obj.x - (obj.word.length - 1) / 2, obj.y - (obj.word.length - 1) / 2];

    return obj;
  };

  var getFirstPosWord = function (word, sizeMatrix, choixDisp) {

    var obj = {};
    switch (choixDisp) {

      case 0:
        // horiz sens de gauche � droite
        obj = getCoordHorizontal(word,
          sizeMatrix,
          parseInt(Math.random() * sizeMatrix - 1),
          parseInt(Math.random() * (sizeMatrix - word.length)));

        break;

      case 1:
        // horiz sens de droite � gauche
        obj = getCoordHorizontalInverse(word,
          sizeMatrix,
          parseInt(Math.random() * sizeMatrix - 1),
          parseInt(Math.random() * (sizeMatrix - word.length) + word.length - 1));
        break;

      case 2:
        // vert sens de haut en bas
        obj = getCoordVertical(word,
          sizeMatrix,
          parseInt(Math.random() * (sizeMatrix - word.length)),
          parseInt(Math.random() * sizeMatrix));
        break;

      case 3:
        // vert sens de bas en haut
        obj = getCoordVerticalInverse(word,
          sizeMatrix,
          parseInt(Math.random() * (sizeMatrix - word.length) + word.length - 1),
          parseInt(Math.random() * sizeMatrix));

        // obj = getCoordVerticalInverse(word,
        // sizeMatrix,
        // sizeMatrix - 2,
        // sizeMatrix - 2);
        break;

      case 4:
        // diag sens de lecture droite
        obj = getCoordDiagonaleDroite(word,
          sizeMatrix,
          parseInt(Math.random() * (sizeMatrix - word.length)),
          parseInt(Math.random() * (sizeMatrix - word.length)));
        break;

      case 5:
        // diag sens de lecture gauche
        obj = getCoordDiagonaleGauche(word,
          sizeMatrix,
          parseInt(Math.random() * (sizeMatrix - word.length)),
          parseInt(Math.random() * (sizeMatrix - word.length) + word.length - 1));
        break;

      case 6:
        // diag sens de lecture inverse droite
        obj = getCoordDiagonaleInverseDroite(word,
          sizeMatrix,
          parseInt(Math.random() * (sizeMatrix - word.length) + word.length - 1),
          parseInt(Math.random() * (sizeMatrix - word.length)));
        break;

      case 7:
        // diag sens de lecture inverse gauche
        obj = getCoordDiagonaleInverseGauche(word,
          sizeMatrix,
          parseInt(Math.random() * (sizeMatrix - word.length) + word.length - 1),
          parseInt(Math.random() * (sizeMatrix - word.length) + word.length - 1));
        break;

      default:
        break;
    }
    return obj;
  };

  var isCollisionHorizontal = function (ntab, obj) {

    var tabEl = ntab[obj.x];
    var delta = obj.y + obj.word.length;
    var h = 0;
    for (var j = obj.y; j < delta; j++) {
      if (tabEl[j] != "*" && tabEl[j] != obj.word[h]) return true;
      ++h;
    }
    return false;
  };

  var isCollisionHorizontalInverse = function (ntab, obj) {

    var tabEl = ntab[obj.x];
    var diff = obj.y - obj.word.length;
    var h = 0;
    for (var j = obj.y; j > diff; j--) {
      if (tabEl[j] != "*" && tabEl[j] != obj.word[h]) return true;
      ++h;
    }
    return false;
  };


  var isCollisionVertical = function (ntab, obj) {

    var delta = obj.x + obj.word.length;
    var h = 0;
    for (var j = obj.x; j < delta; j++) {
      if (ntab[j][obj.y] != "*" && ntab[j][obj.y] != obj.word[h]) return true;
      ++h;
    }
    return false;
  };

  var isCollisionVerticalInverse = function (ntab, obj) {

    var delta = obj.x - obj.word.length;
    var h = 0;
    for (var j = obj.x; j > delta; j--) {
      if (ntab[j][obj.y] != "*" && ntab[j][obj.y] != obj.word[h]) return true;
      ++h;
    }
    return false;
  };

  var isCollisionDiagonalDroite = function (ntab, obj) {

    var delta = obj.x + obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j < delta; j++) {

      if (ntab[j][ny] != "*" && ntab[j][ny] != obj.word[h]) return true;
      ++h;
      ++ny;
    }

    return false;
  };

  var isCollisionDiagonalGauche = function (ntab, obj) {

    var delta = obj.x + obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j < delta; j++) {

      if (ntab[j][ny] != "*" && ntab[j][ny] != obj.word[h]) return true;
      ++h;
      --ny;
    }

    return false;
  };

  var isCollisionDiagonalInverseDroite = function (ntab, obj) {

    var delta = obj.x - obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j > delta; j--) {
      if (ntab[j][ny] != "*" && ntab[j][ny] != obj.word[h]) return true;
      ++h;
      ++ny;
    }

    return false;
  };

  var isCollisionDiagonalInverseGauche = function (ntab, obj) {

    var delta = obj.x - obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j > delta; j--) {
      if (ntab[j][ny] != "*" && ntab[j][ny] != obj.word[h]) return true;
      ++h;
      --ny;
    }

    return false;
  };

  var setPosHorizontalInverse = function (ntab, obj) {

    var tabEl = ntab[obj.x];
    var diff = obj.y - obj.word.length;
    var h = 0;
    for (var j = obj.y; j > diff; j--) {
      tabEl[j] = obj.word[h];
      ++h;
    }
  };

  var setPosHorizontal = function (ntab, obj) {

    var tabEl = ntab[obj.x];
    var delta = obj.y + obj.word.length;
    var h = 0;
    for (var j = obj.y; j < delta; j++) {
      tabEl[j] = obj.word[h];
      ++h;
    }
  };

  var setPosVertical = function (ntab, obj) {

    var delta = obj.x + obj.word.length;
    var h = 0;
    for (var j = obj.x; j < delta; j++) {
      ntab[j][obj.y] = obj.word[h];
      ++h;
    }
  };

  var setPosVerticalInverse = function (ntab, obj) {

    var delta = obj.x - obj.word.length;
    var h = 0;
    for (var j = obj.x; j > delta; j--) {
      ntab[j][obj.y] = obj.word[h];
      ++h;
    }
  };

  var setPosDiagonaleDroite = function (ntab, obj) {

    var delta = obj.x + obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j < delta; j++) {

      ntab[j][ny] = obj.word[h];
      ++h;
      ++ny;
    }
  };

  var setPosDiagonaleGauche = function (ntab, obj) {

    var delta = obj.x + obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j < delta; j++) {

      ntab[j][ny] = obj.word[h];
      ++h;
      --ny;
    }
  };

  var setPosDiagonaleInverseGauche = function (ntab, obj) {

    var delta = obj.x - obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j > delta; j--) {
      ntab[j][ny] = obj.word[h];
      ++h;
      --ny;
    }
  };

  var setPosDiagonaleInverseDroite = function (ntab, obj) {

    var delta = obj.x - obj.word.length;
    var h = 0;
    var ny = obj.y;
    for (var j = obj.x; j > delta; j--) {
      ntab[j][ny] = obj.word[h];
      ++h;
      ++ny;
    }
  };

  var setPosition = function (ntab, obj) {
    if (obj.sens === "Horizontal-inverse") {
      setPosHorizontalInverse(ntab, obj);
    } else if (obj.sens === "Horizontal") {
      setPosHorizontal(ntab, obj);
    } else if (obj.sens === "Vertical") {
      setPosVertical(ntab, obj);
    } else if (obj.sens === "Vertical-inverse") {
      setPosVerticalInverse(ntab, obj);
    } else if (obj.sens === "Diagonale-droite") {
      setPosDiagonaleDroite(ntab, obj);
    } else if (obj.sens === "Diagonale-gauche") {
      setPosDiagonaleGauche(ntab, obj);
    } else if (obj.sens === "Diagonale-inverse-gauche") {
      setPosDiagonaleInverseGauche(ntab, obj);
    } else if (obj.sens === "Diagonale-inverse-droite") {
      setPosDiagonaleInverseDroite(ntab, obj);
    }
  };

  var setAllWords = function (myWords, ntab, sizeMatrix) {

    var objWords = [];
    var index = 0;
    var indexDist = 0;
    var bool = true;

    var obj = getFirstPosWord(myWords[0], sizeMatrix, parseInt(Math.random() * 8));
    objWords.push(obj);
    setPosition(ntab, obj);

    for (var i = 1; i < myWords.length; ++i) {

      bool = true;
      indexDist = 0;
      var distArray = calculDistanceMax(objWords, sizeMatrix - 2);
      while (bool && indexDist != distArray.length) {

        index = 0;
        maxDist = distArray[indexDist];
        var possibleArrays = getAcceptablePosition(maxDist, myWords[i], sizeMatrix);
        possibleArrays = shuffle(possibleArrays);

        while (bool && index != possibleArrays.length) {

          var elementArray = possibleArrays[index];
          if (elementArray === "Horizontal-inverse") {
            obj = getCoordHorizontalInverse(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionHorizontalInverse(ntab, obj);

          } else if (elementArray === "Horizontal") {
            obj = getCoordHorizontal(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionHorizontal(ntab, obj);

          } else if (elementArray === "Vertical") {
            obj = getCoordVertical(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionVertical(ntab, obj);

          } else if (elementArray === "Vertical-inverse") {
            obj = getCoordVerticalInverse(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionVerticalInverse(ntab, obj);

          } else if (elementArray === "Diagonale-droite") {
            obj = getCoordDiagonaleDroite(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionDiagonalDroite(ntab, obj);

          } else if (elementArray === "Diagonale-gauche") {
            obj = getCoordDiagonaleGauche(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionDiagonalGauche(ntab, obj);

          } else if (elementArray === "Diagonale-inverse-gauche") {
            obj = getCoordDiagonaleInverseGauche(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionDiagonalInverseGauche(ntab, obj);

          } else if (elementArray === "Diagonale-inverse-droite") {
            obj = getCoordDiagonaleInverseDroite(myWords[i], sizeMatrix, maxDist.x, maxDist.y);
            bool = isCollisionDiagonalInverseDroite(ntab, obj);

          }
          index++;
        }
        indexDist++;
      }

      if (bool) {
        console.log("*** collision ***");
        return;
      }

      setPosition(ntab, obj);
      objWords.push(obj);
    }
  };

	//var ntab = fillBlank(tab);
	var sizeMatrix = Math.ceil(avgWordsLength) * 2 + 2;
	var ntab = initMatrix(sizeMatrix);
	setAllWords(myWords, ntab, sizeMatrix);
	afficher(ntab);
	console.log("//////////////////");
	fillMatrix(ntab, sizeMatrix);
	afficher(ntab);

})();
