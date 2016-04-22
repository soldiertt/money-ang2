/*jshint esversion: 6 */
const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');
const rename = require('gulp-rename');

gulp.task('app-bundle', function () {

  var tsProject = ts.createProject('client/tsconfig.json',{ outDir: undefined, rootDir: undefined, out: "money-bundle.min.js"});

  return gulp.src('client/app/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/client/js'));
});

gulp.task('vendor-bundle', function() {
  gulp.src([
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/systemjs/dist/system-polyfills.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/router.dev.js',
    'node_modules/angular2/bundles/http.dev.js'
  ])
  .pipe(concat('vendors.min.js'))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest('./dist/client/js'));
});

gulp.task('boot-bundle', function() {
  gulp.src('dist/client/js/system.config.prod.js')
    .pipe(concat('boot.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/client/js'));
 });

 gulp.task('html', function() {
   gulp.src('server/views/index.ejs')
     .pipe(htmlreplace({
       'vendor': 'js/vendors.min.js',
       'app': 'js/money-bundle.min.js',
       'boot': 'js/boot.min.js'
     }))
     .pipe(rename('index-prod.ejs'))
     .pipe(gulp.dest('./server/views'));
 });

 gulp.task('default', ['app-bundle','vendor-bundle', 'boot-bundle', 'html'], function() {
   console.log("Done");
 });
