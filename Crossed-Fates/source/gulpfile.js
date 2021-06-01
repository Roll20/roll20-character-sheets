const gulp = require('gulp');
const pug = require('gulp-pug-3');
const sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('./app/CrossedFates.scss')
      .pipe(sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError))
    .pipe(gulp.dest('../'))
})

gulp.task('html', function () {
  return gulp.src('./app/CrossedFates.pug')
    .pipe(pug({
      pretty: true,
      locals: require('../translation.json')
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('watch', gulp.series(['sass', 'html'], () => {
  gulp.watch('./app/**/*.scss', gulp.series(['sass']))
  gulp.watch(['./app/**/*.pug','./app/**/*.js'], gulp.series(['html']))
}))

gulp.task('build', gulp.series([
  'sass',
  'html']))
