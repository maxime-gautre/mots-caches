'use strict';

angular.module('projectsApp')
  .directive('dragSelect', function($window, $document) {
  return {
    scope: {
      dragSelectIds: '='
    },
    controller: function($scope, $element) {

      var cls = 'eng-selected-item';
      var startCell = null;
      var dragging = false;

      function mouseUp() {
        dragging = false;
      }
      
      function mouseDown(el) {
        dragging = true;
        setStartCell(el);
        setEndCell(el);
      }
      
      function mouseEnter(el) {
        if (!dragging) {return;}
        setEndCell(el);
      }
      
      function setStartCell(el) {
        startCell = el;
      }
      
      function setEndCell(el) {
        $scope.dragSelectIds = [];
        $element.find('td').removeClass(cls);
        cellsBetween(startCell, el).each(function() {
          var el = angular.element(this);
          el.addClass(cls);
          $scope.dragSelectIds.push(el.attr('id'));
        });
      }
      
      function cellsBetween(start, end) {
        var coordsStart = getCoords(start);
        var coordsEnd = getCoords(end);

        if(coordsStart.column === coordsEnd.column) {
          if(coordsEnd.row > coordsStart.row) {
            return $element.find('td').filter(function() {
              var el = angular.element(this);
              var coords = getCoords(el);
              return coords.row <= coordsEnd.row && coords.row >= coordsStart.row && coords.column === coordsStart.column;
            });
          }  else {
               return $element.find('td').filter(function() {
              var el = angular.element(this);
              var coords = getCoords(el);
              return coords.row >= coordsEnd.row && coords.row <= coordsStart.row && coords.column === coordsStart.column;
            });
          }
        }

        if(coordsStart.row === coordsEnd.row) {
          if(coordsEnd.column > coordsStart.column) {
            return $element.find('td').filter(function() {
              var el = angular.element(this);
              var coords = getCoords(el);
              return coords.column <= coordsEnd.column && coords.column >= coordsStart.column && coords.row === coordsStart.row;
            });
          } else {
              return $element.find('td').filter(function() {
              var el = angular.element(this);
              var coords = getCoords(el);
              return coords.column >= coordsEnd.column && coords.column <= coordsStart.column && coords.row === coordsStart.row;
            });
          }  
        }

        if(coordsEnd.row - coordsStart.row === coordsEnd.column - coordsStart.column) {
            
            if(coordsEnd.row > coordsStart.row) {

              return $element.find('td').filter(function() {
                var el = angular.element(this);
                var coords = getCoords(el);
                return coords.column - coordsEnd.column === coords.row - coordsEnd.row && coords.column <= coordsEnd.column && coords.column >= coordsStart.column;
              }); 

            } else {

              return $element.find('td').filter(function() {
                var el = angular.element(this);
                var coords = getCoords(el);
                return coords.column - coordsEnd.column === coords.row - coordsEnd.row && coords.column >= coordsEnd.column && coords.column <= coordsStart.column;
              }); 
            }
        }

        if(coordsEnd.row - coordsStart.row === coordsStart.column - coordsEnd.column) {
          
            if(coordsEnd.row > coordsStart.row) {

              return $element.find('td').filter(function() {
                var el = angular.element(this);
                var coords = getCoords(el);
                return coordsEnd.row - coords.row === coords.column - coordsEnd.column && coords.row <= coordsEnd.row && coords.row >= coordsStart.row;
              }); 
            } else {
                return $element.find('td').filter(function() {
                  var el = angular.element(this);
                  var coords = getCoords(el);
                  return coordsEnd.row - coords.row === coords.column - coordsEnd.column && coords.row >= coordsEnd.row && coords.row <= coordsStart.row;
              }); 
            }
        }

       return $element.find('td').filter(function() {
              var el = angular.element(this);
              var coords = getCoords(el);
              return coords.column === coordsEnd.column && coords.row === coordsEnd.row || coords.row === coordsStart.row && coords.column === coordsStart.column;
        }); 
      }
      
      function getCoords(cell) {
        return {
          column: cell[0].cellIndex, 
          row: cell.parent()[0].rowIndex
        };
      }
    
      function wrap(fn) {
        return function() {
          var el = angular.element(this);
          $scope.$apply(function() {
            fn(el);
          });
        };
      }
      
      $element.delegate('td', 'mousedown', wrap(mouseDown));
      $element.delegate('td', 'mouseenter', wrap(mouseEnter));
      $document.delegate('body', 'mouseup', wrap(mouseUp));
    }
  };
});

angular.module('projectsApp')
.directive('customClick', function($window, $document) {
    return {
        link: function(scope, element) {
          element.click(function() {
            $document.find('#mainTable').find('td').removeClass('eng-selected-item');
          }); 
        }
    };
});
