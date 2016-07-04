'use strict';

angular.module('ms-web')

.controller('ProductsCtrl', function($scope, $loading, ProductsService, UsersService) {
  var loadList = function( ) {
    ProductsService.list().then(function(products) {
      console.log(products);
      $scope.products = products;
    }).catch(function(error) {
      $scope.error = error;
    });
  }
  loadList();

  $scope.addProduct = function(product) {
    $loading.start("product")
    ProductsService.create(product).then(loadList).then(function() {
      $loading.finish("product");
      $scope.product = {};
    });
  }
});
