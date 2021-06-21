const pug = require('gulp-pug')
const data = require('gulp-data')
const stylus = require('gulp-stylus')
const gulp = require('gulp')
const fs = require('fs')
const path = require('path'),
merge = require('gulp-merge-json')
const translation = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../translation.json')))

gulp.task('data', function() {
  return gulp.src(['data/**/*.json', '../translation.json'], {allowEmpty: true})
    .pipe(merge({
      fileName: 'data.json',
      edit: (json, file) => {
        // Extract the filename and strip the extension
        var filename = path.basename(file.path),
          primaryKey = filename.replace(path.extname(filename), '')

        // Set the filename as the primary key for our JSON data
        var data = {}
        data[primaryKey.toLowerCase()] = json

        return data
      }
    }))
    .pipe(gulp.dest('./temp'))
})

gulp.task('css', () => {
  return gulp.src('./app/Ironsworn-starforged.styl')
    .pipe(stylus())
    .pipe(gulp.dest('../'))
})
 
gulp.task('html', () => {
  return gulp.src('./app/Ironsworn-starforged.pug')
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync('./temp/data.json'))
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('watch', gulp.series(['css', 'data', 'html'], () => {
  gulp.watch('./app/**/*.styl', gulp.series(['css']))
  gulp.watch(['./app/**/*.pug','./app/**/*.js'], gulp.series(['html']))
}))

gulp.task('build',  gulp.series(['css', 'data', 'html']))