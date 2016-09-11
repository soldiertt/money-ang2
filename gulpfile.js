/*jshint esversion: 6 */
const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');
const rename = require('gulp-rename');

gulp.task('app-bundle', function () {

  var tsProject = ts.createProject('client/src/ts/tsconfig.json',{ rootDir: 'client/src/ts', out: "money-bundle.min.js"});

  return tsProject.src()
    .pipe(ts(tsProject))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('client/src/dist'));
});

gulp.task('vendor-bundle', function() {
  gulp.src([
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/@angular/core/index.js',
    'node_modules/@angular/router/index.js',
    'node_modules/@angular/http/index.js'
  ])
  .pipe(concat('vendors.min.js'))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest('./client/src/assets/js'));
});

gulp.task('boot-bundle', function() {
  gulp.src('client/src/assets/js/system.config.prod.js')
    .pipe(concat('boot.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./client/src/assets/js'));
 });

 gulp.task('html', function() {
   gulp.src('server/src/views/index.ejs')
     .pipe(htmlreplace({
       'vendor': 'assets/js/vendors.min.js',
       'app': 'assets/js/money-bundle.min.js',
       'boot': 'assets/js/boot.min.js'
     }))
     .pipe(rename('index-prod.ejs'))
     .pipe(gulp.dest('./server/src/views'));
 });

 gulp.task('default', ['app-bundle','vendor-bundle', 'boot-bundle', 'html'], function() {
   console.log("Done");
 });
