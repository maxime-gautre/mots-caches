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

      function mouseUp(el) {
        dragging = false;
      }
      
      function mouseDown(el) {
        dragging = true;
        setStartCell(el);
        setEndCell(el);
      }
      
      function mouseEnter(el) {
        if (!dragging) return;
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
        var topLeft = {
          column: $window.Math.min(coordsStart.column, coordsEnd.column),
          row: $window.Math.min(coordsStart.row, coordsEnd.row),
        };
        var bottomRight = {
          column: $window.Math.max(coordsStart.column, coordsEnd.column),
          row: $window.Math.max(coordsStart.row, coordsEnd.row),
        };
        return $element.find('td').filter(function() {
          var el = angular.element(this);
          var coords = getCoords(el);
          return coords.column >= topLeft.column
              && coords.column <= bottomRight.column
              && coords.row >= topLeft.row
              && coords.row <= bottomRight.row;
        });
      }
      
      function getCoords(cell) {
        var row = cell.parents('row');
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
        }
      }
      
      $element.delegate('td', 'mousedown', wrap(mouseDown));
      $element.delegate('td', 'mouseenter', wrap(mouseEnter));
      $document.delegate('body', 'mouseup', wrap(mouseUp));
    }
  }
});