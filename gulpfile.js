var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var watch = require('gulp-watch');

gulp.task('default', ['compile']);

gulp.task('compile', ['html','babel','img' ] );

gulp.task('html',function(){
  gulp.src('src/index.html')
    .pipe(copy('app/',{prefix:2}));
});

gulp.task('babel',function(){
  gulp.src(['src/js/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('img',function(){
  gulp.src('src/img/**/*')
    .pipe(copy('app/img/',{prefix:2}));
});

gulp.task('watch', function () {
  gulp.watch('src/index.html', function() {
      gulp.run('html');
  });
  gulp.watch('src/js/**/*.js', function() {
      gulp.run('babel');
  });
  gulp.watch('src/img/**/*', function() {
      gulp.run('img');
  });
});
