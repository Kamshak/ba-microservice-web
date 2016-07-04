'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });

    var injectScripts = gulp.src([
      options.src + '/app/**/*.js',
      '!' + options.src + '/app/**/*.spec.js',
      '!' + options.src + '/app/**/*.mock.js'
    ])
    .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectTransformedConfig = gulp.src([options.src + '/app/config/*.js'])
    .pipe($.replace(/\{\{\$([\_A-Z]+)\}\}/g, function(match, envVar) {
      return process.env[envVar] || "NULL";
    }));

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe($.inject(injectTransformedConfig, {
        starttag: '<!-- inject:config -->',
        transform: function(filePath, file) {
          return '<script type="text/javascript">' + file.contents.toString('utf8') + '</script>';
        }
      }))
      .pipe(wiredep(options.wiredep))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });

  gulp.task('injectConfig', function() {
  });
};
