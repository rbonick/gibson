'use strict';

var gulp = require('gulp');

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
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            host: "0.0.0.0"
        }));
});