'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var fs = require("fs");
var through = require('through2');
var gutil = require('gulp-util');

/*
  Looks for {{ var }} in the stream and replaces is with variables from the JSON file
*/
var replaceTemplateFromJson = function(jsonFile) {
  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
			callback(null, file);
			return;
		}

    fs.readFile(jsonFile, 'utf8', (err, data) => {
      if (err) {
        return callback(new gutil.PluginError('replaceTemplateFromJson', err));
      }

      if (file.isStream()) {
        callback(new gutil.PluginError('replaceTemplateFromJson', 'Streaming not supported'));
	      return;
      }

      if (file.isBuffer()) {
        var data;
        try {
          data = JSON.parse(data);
        } catch(err) {
          return callback(new gutil.PluginError('replaceTemplateFromJson', err));
        }

        try {
          file.contents = new Buffer(String(file.contents).replace(/\{\{([0-9a-zA-Z\_-]+)\}\}/g, function(match, toReplace) {
            if (data[toReplace] == undefined) {
              throw new Error("Key " + toReplace + " not found in JSON values map");
            }
            return data[toReplace];
          }));
        } catch (err) {
          return callback(new gutil.PluginError('replaceTemplateFromJson', err));
        }
      }

      callback(null, file);
    });
  });
}

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
    .pipe(replaceTemplateFromJson(options.serviceConfigurationFile)).on('error', options.errorHandler('ReplaceTemplateFromJson'));

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
};
