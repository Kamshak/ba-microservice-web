"use strict";

angular.module('ms-web')

.value('ServiceConfig', {
  // These are injected via Gulp from env variables
  usersServiceUrl: '{{$USERS_SERVICE_URL}}',
  productsServiceUrl: '{{$PRODUCTS_SERVICE_URL}}'
});
