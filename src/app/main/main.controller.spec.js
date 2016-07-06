'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('ms-web'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should define a login function', inject(function($controller) {
    expect(scope.login).toBeUndefined();

    $controller('MainCtrl', {
      $scope: scope,
      userName: "Test Username",
    });

    expect(angular.isFunction(scope.login)).toBeTruthy();
  }));
});
