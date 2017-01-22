var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');

gulp.task('default', ['compile']);

gulp.task('compile', ['html','babel','lib', 'assets' ] );

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

gulp.task('lib',function(){
  del(['app/lib/**/*']);
  gulp.src('src/lib/**/*', {base:'src/lib'})
    .pipe(gulp.dest('app/lib/'));
});

gulp.task('assets',function(){
  del(['app/assets/**/*']);
  gulp.src('src/assets/**/*', {base:'src/assets'})
    .pipe(gulp.dest('app/assets/'));
});
