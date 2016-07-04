'use strict';

angular.module('ms-web')
.controller('NavbarCtrl', function($scope, LoadingIndicator, $rootScope, UsersService) {
    $scope.loadingIndicator = LoadingIndicator;
    $scope.UsersService = UsersService;
});
