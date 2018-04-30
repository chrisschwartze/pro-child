/*
 * GULP CONFIG
*/


/* SETTINGS
/===================================================== */
// local domain used by browsersync
var browsersync_proxy = "dev.xx.com";

// default asset paths
var assets = {
  css: ['assets/styles/bundle.scss'],
  css_watch: ['assets/styles/*/*.scss'],
  javascript: ['assets/scripts/*.js'],
  images: ['assets/images/*.*']
}

// vendors are loaded from gulpmodules.json
var vendors = require('./gulpmodules.json');


/* DEPENDENCIES
/===================================================== */
// general
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var order = require("gulp-order");
var browserSync = require('browser-sync').create();
// css
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
// cache busting
var rev = require('gulp-rev');
// js
var uglify = require('gulp-uglify');
// images
var imagemin = require('gulp-imagemin');
// error handling with notify & plumber
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');
// watch
var watch = require('gulp-watch');
// delete
var del = require('del');
// sourcemap support
var sourcemaps = require('gulp-sourcemaps');
// group media Queries
var gcmq = require('gulp-group-css-media-queries');

/* TASKS
/===================================================== */

/* CLEAN
/------------------------*/
// delete compiled files/folders (before running the build)
// css
gulp.task('clean:css', function() { return del(['dist/*.css', 'dist/rev-manifest.json'])});
gulp.task('clean:cachebust', function() { return del(['dist/main-*.min.css'])});
gulp.task('clean:javascript', function() { return del(['dist/*.js'])});
gulp.task('clean:images', function() { return del(['dist/images'])});

/* BROWSERSYNC
/------------------------*/
// initialize Browser Sync
gulp.task('browsersync', function() {
  browserSync.init({
    proxy: browsersync_proxy,
    notify: false,
    open: true,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
  //  blacklist: ['/wp-admin/**']
    }
  });
});


/* CSS
/------------------------*/
// from:    assets/styles/bundle.scss
// actions: compile, minify, prefix, rename
// to:      dist/app.min.css
gulp.task('css', ['clean:css'], function() {
  return gulp.src(assets['css'].concat(vendors['css']))
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(concat('app.min.css'))
    .pipe(sass())
    .pipe(autoprefixer('last 2 version', { cascade: false }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(rename('dist/app.min.css'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});


/* CSS CACHE BUSTING
/------------------------*/
// from:    dist/app.min.css
// actions: create busted version of file
// to:      dist/style-[hash].min.css
gulp.task('cachebust', ['clean:cachebust', 'css'], function() {
  return gulp.src('dist/app.min.css')
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest({merge: true}))
    .pipe(gulp.dest('dist'))
});


/* JAVASCRIPT
/------------------------*/
// from:    assets/scripts/
// actions: concatinate, minify, rename
// to:      dist/script.min.css
gulp.task('javascript', ['clean:javascript'], function() {
  return gulp.src(assets['javascript'].concat(vendors['javascript']))
  //  .pipe(sourcemaps.init())
    .pipe(order([
      'assets/scripts/*.js'
    ], { base: './' }))
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
      .pipe(concat('app.min.js'))
      .pipe(uglify())
      .pipe(rename('dist/app.min.js'))
  //  .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});


/* IMAGES
/------------------------*/
// from:    assets/images/
// actions: minify
// to:      dist/images
gulp.task('images', ['clean:images'],  function() {
  return gulp.src(assets['images'].concat(vendors['images']))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    // .pipe(browserSync.stream()); // currently bugged (18.12.2017)
});


/* WATCH
/------------------------*/
// watch for modifications in
// styles, scripts, images, php files, html files
gulp.task('watch',  ['browsersync'], function() {
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('framework/**/**/*.php', browserSync.reload);
  gulp.watch('inc/**/*.php', browserSync.reload);
  gulp.watch('woocommerce/**/*.php', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
  gulp.watch(assets['css_watch'], ['css', 'cachebust']);
  gulp.watch(assets['javascript'], ['javascript']);
  gulp.watch(assets['images'], ['images']);
});


/* DEFAULT
/------------------------*/
// default gulp tasks executed with `gulp`
gulp.task('default', ['css', 'cachebust', 'javascript', 'images']);
