"use strict";

angular.module('ms-web')

.value('ServiceConfig', {
  // These are injected via Gulp from the service configuration file specified in gulpfile.js (default:services.json)
  usersServiceUrl: '{{usersServiceUrl}}',
  productsServiceUrl: '{{productsServiceUrl}}'
});
