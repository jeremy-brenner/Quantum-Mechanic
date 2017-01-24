var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var electron = require('electron-packager');

gulp.task('html',function(){
  return gulp.src('src/index.html')
    .pipe(gulp.dest('app/'));
});

gulp.task('babel',function(){
  return gulp.src(['src/js/**/*.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('index.js'))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('clean:lib',function(){
  return del(['app/lib/**/*']);
});

gulp.task('clean:assets',function(){
  return del(['app/assets/**/*']);
});

gulp.task('clean:builds',function(){
  return del(['builds/**/*']);
});

gulp.task('lib',function(){
  return gulp.src('src/lib/**/*', {base:'src/lib'})
    .pipe(gulp.dest('app/lib/'));
});

gulp.task('assets',function(){
  return gulp.src('src/assets/**/*', {base:'src/assets'})
    .pipe(gulp.dest('app/assets/'));
});

gulp.task('package',function(cb){
  var options = {
    dir: '.',
    all: true,
    out: './builds',
    ignore: [ '/src', '/scripts', 'gulpfile.js', '/builds' ]
  };

  electron( options, function done_callback (err, appPaths) {
    if(err) {
      return cb(err);
    }
    return cb();
  });
});

gulp.task('clean', gulp.parallel('clean:lib', 'clean:assets', 'clean:builds') );
gulp.task('compile', gulp.parallel('html','babel','lib', 'assets' ) );
gulp.task('make_dist', gulp.series('clean','compile','package')  );
gulp.task('default', gulp.series('clean','compile') );
