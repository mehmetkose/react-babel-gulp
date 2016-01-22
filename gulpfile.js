var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');

gulp.task('browserify', function() {
  browserify('./ui/app.jsx', { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./ui/'))
});

gulp.task('minify', function () {
    return gulp.src('./ui/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('./ui/'))
});


gulp.task('watch', function() {
  gulp.watch('./ui/*.jsx', ['browserify','minify'])
});

gulp.task('webserver', function() {
  gulp.src('./ui/')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'minify', 'webserver']);