'use strict';

describe('Controller: CurrentCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherAppApp'));

  var CurrentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CurrentCtrl = $controller('CurrentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CurrentCtrl.awesomeThings.length).toBe(3);
  });
});
