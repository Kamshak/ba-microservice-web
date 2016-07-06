"use strict";

angular.module('ms-web')
.factory('ProductsService', function($http, ServiceConfig, UsersService) {
  var ProductsService = {};

  ProductsService.list = function() {
    return $http({
      method: 'GET',
      url: ServiceConfig.productsServiceUrl + '/products',
      headers: {
        Authorization: "JWT " + UsersService.accessToken
      }
    }).then(function(response){
      return response.data;
    });
  };

  ProductsService.create = function(product) {
    return $http({
      method: 'POST',
      url: ServiceConfig.productsServiceUrl + '/products',
      headers: {
        Authorization: "JWT " + UsersService.accessToken
      },
      data: product
    }).then(function(response){
      return response.data;
    });
  }

  return ProductsService;
});
