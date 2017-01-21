var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
//var watch = require('gulp-watch');

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
  gulp.src('src/lib/**/*')
    .pipe(copy('app/lib/',{prefix:2}));
});

gulp.task('assets',function(){
  gulp.src('src/assets/**/*')
    .pipe(copy('app/assets/',{prefix:2}));
});


gulp.task('watch', ['compile', 'startwatch']);

gulp.task('startwatch', function () {
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/js/**/*.js', ['babel']);
  gulp.watch('src/assets/**/*', ['assets']);
});
