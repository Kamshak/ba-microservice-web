'use strict';

angular.module('ms-web')

.controller('SignupCtrl', function($scope, $loading, UsersService, $state) {
  $scope.signUp = function() {
    if (!$scope.signUpForm.$valid) {
      return;
    }

    if ($scope.user.password != $scope.user.repeatPassword) {
      $scope.error = "The passwords do not match";
    }

    $scope.error = "";

    $loading.start("signup");
    UsersService.signUp($scope.user.email, $scope.user.password).then(function() {
      return UsersService.login($scope.user.email, $scope.user.password);
    }).then(function() {
      $state.go('products');
    }, function(err) {
      console.log(err);
      if (err.status == -1) {
        $scope.error = "Network connection failed";
        return;
      }

      if (err.data && err.data.message == "IntegrityError") {
        $scope.error = "A user with this email already exists";
        return;
      }

      if (err.data) {
        return $scope.error = err.data.message;
      }

      $scope.error = err;
    }).then(function() {
      $loading.finish("signup");
    });
  }
});
