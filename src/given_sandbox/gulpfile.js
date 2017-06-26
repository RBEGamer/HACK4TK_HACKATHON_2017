'use strict';

require('es6-promise').polyfill();

const gulp = require('gulp');
const less = require('gulp-less');
const lessChanged = require('gulp-less-changed');

const lessFiles = [
  './src/**/[^_]*.less',
  './src/app/**/[^_]*.less',
  './assets/less/**/[^_]*.less',
  './assets/styles/**/[^_]*.less',
]

gulp.task('less', function () {
  return gulp.src(lessFiles)
    .pipe(lessChanged())
    .pipe(less())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task('less:all', function () {
  return gulp.src(lessFiles)
    .pipe(less())
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task('less:watch', function() {
  gulp.watch([
    './src/**/*.less',
    './assets/less/**/*.less',
    './assets/styles/**/*.less'
  ], ['less']);
});
