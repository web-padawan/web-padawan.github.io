var gulp          = require('gulp'),
    compass       = require('gulp-compass'),
    csso          = require('gulp-csso'),
    rename        = require('gulp-rename'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer'),
    browserSync   = require('browser-sync'),
    cp            = require('child_process'),
    path          = require('path');

gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('./sass/**/*.scss')
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
    .pipe(gulp.dest('assets/css'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
