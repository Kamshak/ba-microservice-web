"use strict";

angular.module('ms-web')
.factory('UsersService', function($http, ServiceConfig, $q) {
  var UsersService = {};

  UsersService.login = function(email, password) {
    return $http({
      method: 'POST',
      url: ServiceConfig.usersServiceUrl + '/auth',
      data: {
        username: email,
        password: password
      }
    }).then(function(response) {
      UsersService.accessToken = response.data.access_token;
    });
  };

  UsersService.signUp = function(email, password) {
    return $http({
      method: 'POST',
      url: ServiceConfig.usersServiceUrl + '/api/users',
      data: {
        email: email,
        password: password
      }
    });
  }

  UsersService.isLoggedIn = function() {
    return this.accessToken != null;
  };

  UsersService.getUserName = function() {
    return $q.resolve()
    .then(function() {
      if(UsersService.isLoggedIn()) {
        return $http({
          method: 'GET',
          url: ServiceConfig.usersServiceUrl + '/api/users/' + jwt_decode(UsersService.accessToken).identity,
          headers: {
            Authorization: "JWT " + UsersService.accessToken
          }
        });
      } else {
        return $q.reject();
      }
    }).then(function(response){
      return response.data.email;
    });
  }

  return UsersService;
});
