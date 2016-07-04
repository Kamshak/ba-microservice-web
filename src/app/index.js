'use strict';

var app = angular.module('ms-web', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ngStorage', 'darthwade.loading', 'mwl.bluebird'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push(function(LoadingIndicator, $q) {
        return {
            'request': function(config) {
                LoadingIndicator.startedLoading();
                return config;
            },

            'requestError': function(rejection) {
                LoadingIndicator.finishedLoading();
                return $q.reject(rejection);
            },

            'responseError': function(rejection) {
                LoadingIndicator.finishedLoading();
                return $q.reject(rejection);
            },

            'response': function(response) {
                LoadingIndicator.finishedLoading();
                return response;
            }
        };
    });
})

.run(function($transitions, $state){
  /*$transitions.onBefore({to: 'statistics.*'}, ['$transition$', function($transition$) {
    console.log($transition$);
    if (!ScriptFodder.loaded) {
      if ($transition$.from().name == "loading") {
        return false;
      }
      return $state.target('loading');
    }
  }]);*/
})

.run(['$trace', function ($trace) { $trace.enable(1); }])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          userName: function(UsersService) {
            if (UsersService.isLoggedIn()) {
              return UsersService.getUserName();
            }
          }
        }
    })
    .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'app/main/signup.html',
        controller: 'SignupCtrl'
    })
    .state('products', {
      url: '/products',
      templateUrl: 'app/main/products.html',
      controller: 'ProductsCtrl',
      resolve: {
        isLoggedIn: function(UsersService, $state) {
          console.log("Hi", UsersService.isLoggedIn());
          if (!UsersService.isLoggedIn()) {
            $state.go('home');
          }
        }
      }
    })
    $urlRouterProvider.otherwise('/');
})
.run(function($q){
  $q.longStackTraces();
});
