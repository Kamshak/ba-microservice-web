'use strict';

var gulp = require('gulp');

module.exports = function(options) {
  gulp.task('build-continuous', ['build'], function () {
    gulp.watch([options.serviceConfigurationFile], ['build']);
  });
};
