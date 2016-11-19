'use strict';

var gulp = require('gulp');
// var sass = require('gulp-sass');

// gulp.task('sass', function () {
//   gulp.src('./styles/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./styles'));
// });

// gulp.task('sass:watch', function () {
//   gulp.watch('./styles/**/*.scss', ['sass']);
// });

gulp.task('build', function(){

	gulp.src('./styles/main.css')
		.pipe(gulp.dest('./build/styles/'))

	gulp.src('./index.html')
		.pipe(gulp.dest('./build/'))

	gulp.src('./api/*')
		.pipe(gulp.dest('./build/api'))

	gulp.src('./fonts/**')
		.pipe(gulp.dest('./build/fonts'))

	gulp.src('./config.js')
		.pipe(gulp.dest('./build/'))

	gulp.src('./dist/**')
		.pipe(gulp.dest('./build/dist'))

	gulp.src('./images/**')
		.pipe(gulp.dest('./build/images'))

	gulp.src('./vendor/**')
		.pipe(gulp.dest('./build/vendor'))
})