var gulp          = require('gulp'),
    compass       = require('gulp-compass'),
    csso          = require('gulp-csso'),
    rename        = require('gulp-rename'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    path          = require('path');

gulp.task('compile', function() {
  gulp.src('./sass/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'assets/css',
      images: 'assets/images',
      bundle_exec: true
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(csso())
    .pipe(gulp.dest('assets/css'));
});

gulp.task('default', function() {
  gulp.watch('sass/**/**/*.scss', ['compile']);
});
