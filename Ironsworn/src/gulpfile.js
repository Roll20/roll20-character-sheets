const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const gulp = require('gulp')

gulp.task('css', () => {
  return gulp.src('./app/Ironsworn.styl')
    .pipe(stylus())
    .pipe(gulp.dest('../'))
})
 
gulp.task('html', () => {
  return gulp.src('./app/Ironsworn.pug')
    .pipe(pug({
      pretty: true,
      locals: { translations: require('../translation.json'), fs: require('fs')}
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('watch', gulp.series(['css', 'html'], () => {
  gulp.watch('./app/**/*.styl', gulp.series(['css']))
  gulp.watch(['./app/**/*.pug','./app/**/*.js'], gulp.series(['html']))
}))

gulp.task('build',  gulp.series(['css','html']))