"use strict";

angular.module('ms-web')
.factory('ProductsService', function($http, ServiceConfig, UsersService) {
  let ProductsService = {};

  ProductsService.list = function() {
    return $http({
      method: 'GET',
      url: ServiceConfig.productsServiceUrl + '/',
      headers: {
        Authorization: "JWT " + UsersService.accessToken
      }
    });
  };

  return ProductsService;
});
