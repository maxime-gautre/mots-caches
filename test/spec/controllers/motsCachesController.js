
'use strict';

describe('Controller: MotsCachesController', function () {

  // load the controller's module
  beforeEach(module('projectsApp'));

  var MotsCachesController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MotsCachesController = $controller('MotsCachesController', {
      $scope: scope
    });
  }));

  it('should attach a list of words to the scope', function () {
    expect(scope.myWords.length).toBe(22);
  });

});
