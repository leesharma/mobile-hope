var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');
var sh = require('shelljs');


var paths = {
  sass: ['./scss/**/*.scss'],
  test: {
      client:   [],
      server:   ['./server/api/**/*.spec.js'],
      e2e:      [],
  },
  server: ['./server/**'],
};


gulp.task('default', ['sass', 'test']);
gulp.task('watch', ['watch:sass', 'watch:test']);


/**
 * Tests and Specs
 */

gulp.task('test', ['test:client', 'test:server', 'test:e2e']);

// individual test tasks

gulp.task('test:client', function (done) {});

gulp.task('test:server', function (done) {
  return gulp.src(paths.test.server, {read: false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test:e2e', function (done) {});

// watchers

gulp.task('watch:test', ['watch:server']);

gulp.task('watch:server', function () {
    gulp.watch(
        paths.test.server.concat(paths.server),
        ['test:server']
    );
});


/**
 * Build assets
 */

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

// watchers

gulp.task('watch:sass', function() {
  gulp.watch(paths.sass, ['sass']);
});


/**
 * Etc.
 */

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
