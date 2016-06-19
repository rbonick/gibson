'use strict';

var gulp = require('gulp');

gulp.task('default', ['webserver', 'sass:watch', 'jekyll:watch']);

/**
 * SASS
 */
var sass = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./src/gibson.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass']);
});

/**
 * Webserver
 */
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('_site')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            host: "0.0.0.0"
        }));
});

/**
 * Jekyll
 */
gulp.task('jekyll', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});
gulp.task('jekyll:watch', function() {
    gulp.watch(['./_includes/**/*.html', './index.html'], ['jekyll']);
});