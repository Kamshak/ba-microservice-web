'use strict';

angular.module('ms-web')

.controller('MainCtrl', function($scope, $loading, $rootScope, UsersService, $state, userName) {
  $scope.UsersService = UsersService;
  $scope.userName = userName;
  $scope.login = function(email, password) {
    $loading.start('login');
    UsersService.login(email, password)
    .then(function() {
      $state.go('products');
    }, function(err) {
      if (err.data && err.data.description) {
        $scope.error = err.data.description;
      } else {
        $scope.error = err;
      }
    }).then(function() {
      $loading.finish('login');
    });
  }
});
