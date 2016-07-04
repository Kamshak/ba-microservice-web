'use strict';

angular.module('ms-web')

.controller('ProductsCtrl', function($scope, $loading, ProductsService, UsersService) {  
  ProductsService.list().then(function(products) {
    $scope.products = products;
  }).catch(function(error) {
    $scope.error = error;
  });
});
