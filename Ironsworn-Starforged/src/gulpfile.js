const pug = require('gulp-pug');
const data = require('gulp-data');
const stylus = require('gulp-stylus');
const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const merge = require('gulp-merge-json');

axios.defaults.baseURL =
  'https://raw.githubusercontent.com/rsek/dataforged/main/roll20';

gulp.task('dataforge', async function() {
  const rawData = {
    oracles: await axios.get('/oracles.json'),
    assets: await axios.get('/assets.json'),
    moves: await axios.get('/moves.json'),
    movegroups: await axios.get('/movegroups.json'),
    rolls: await axios.get('/rolls.json'),
  };
  const translationData = {
    'translation-assets': await axios.get('/translation-assets.json'),
  };

  for (let key in rawData) {
    const data = rawData[key].data;
    const fileName = path.join(__dirname, `./app/data/${key}.json`);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  }
  for (let key in translationData) {
    const data = translationData[key].data;
    const fileName = path.join(__dirname, `./app/translations/${key}.json`);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  }
});

gulp.task('mergeTranslation', function() {
  return gulp
    .src('app/translations/translation-**.json')
    .pipe(merge({ fileName: 'translation.json' }))
    .pipe(gulp.dest('../'));
});

gulp.task('data', function() {
  return gulp
    .src(['app/data/**/*.json', '../translation.json'], { allowEmpty: true })
    .pipe(
      merge({
        fileName: 'data.json',
        edit: (json, file) => {
          // Extract the filename and strip the extension
          var filename = path.basename(file.path),
            primaryKey = filename.replace(path.extname(filename), '');

          // Set the filename as the primary key for our JSON data
          var data = {};
          data[primaryKey.toLowerCase()] = json;

          return data;
        },
      })
    )
    .pipe(gulp.dest('./temp'));
});

gulp.task('css', () => {
  return gulp
    .src('./app/Ironsworn-starforged.styl')
    .pipe(stylus())
    .pipe(gulp.dest('../'));
});

gulp.task('html', () => {
  return gulp
    .src('./app/Ironsworn-starforged.pug')
    .pipe(
      data(function() {
        return JSON.parse(fs.readFileSync('./temp/data.json'));
      })
    )
    .pipe(
      pug({
        // pretty: true,
        ...require('./app/pug.config'),
      })
    )
    .pipe(gulp.dest('../'));
});

gulp.task(
  'watch',
  gulp.series(['dataforge', 'css', 'data', 'html'], () => {
    gulp.watch('./app/**/*.styl', gulp.series(['css']));
    gulp.watch(['./app/**/*.pug', './app/**/*.js'], gulp.series(['html']));
  })
);

gulp.task(
  'build',
  gulp.series(['dataforge', 'mergeTranslation', 'data', 'css', 'html'])
);
