'use strict';

const gulp = require('gulp');
const include = require('gulp-include');
const inject = require('gulp-inject');
const minifyHTML = require('gulp-minify-html');
const minifyCss = require('gulp-minify-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const replaceTask = require('gulp-replace-task');
const rename = require('gulp-rename');
const change = require('gulp-change');
const fs = require('fs');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const wrapper = require('gulp-wrapper');
const streamqueue = require('streamqueue');
const request = require('request');
const gutil = require('gulp-util');

const translations = {};

String.prototype.capitalize = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1)
  });
};
String.prototype.lowercase = function () {
  return this.toLowerCase();
};

function getTranslation() {
  translations.en = JSON.parse(fs.readFileSync('./translations/en.json'));
  translations.de = JSON.parse(fs.readFileSync('./translations/de.json'));
  translations.fr = JSON.parse(fs.readFileSync('./translations/fr.json'));
  translations.ru = JSON.parse(fs.readFileSync('./translations/ru.json'));
}

function objByString(o, s) {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  const a = s.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
}

function getTranslationsIfTheyDontExist() {
  if (Object.keys(translations).length === 0) {
    getTranslation();
  }
}
function translationWrapper(lang, key) {
  let translation = objByString(translations[lang], key);

  if (!translation) {
    translation = objByString(translations.en, key)
  }

  return '<span class=' + lang + '>' + translation + '</span>';
}
function translate(key) {
  getTranslationsIfTheyDontExist();
  const translation = translationWrapper('en', key) + translationWrapper('de', key) + translationWrapper('fr', key) + translationWrapper('ru', key);

  return translation;
}
function duplicate(file, limit, start) {
  const template = file.contents.toString('utf8');
  const s = [];

  if (!start) {
    start = 0;
  } else if (start > 0) {
    limit += start;
  }

  for (let i = start; i < limit; i++) {
    s.push(template
      .replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
    );
  }
  return s.join('\n\n');
}
const sassConfig = {
  rules: {
    'clean-import-paths': 0,
    'force-element-nesting': 0,
    'hex-length': 'long',
    'empty-line-between-blocks': 0,
    include: 0
  }
};
gulp.task('sass', function () {
  return gulp.src('./5eShaped.scss')
    /*
     .pipe(sassLint(sassConfig))
     .pipe(sassLint.format())
     .pipe(sassLint.failOnError())
     */
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('../'));
});

const esLintConfig = {
  parser: 'babel-eslint',
  extends: 'airbnb/base',
  rules: {
    'arrow-body-style': 0,
    'indent': 0,
    'max-len': 0,
    'no-cond-assign': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-undef': 0
  }
};
gulp.task('lint', function () {
  return gulp.src(['components/sheetWorkers.js'])
    .pipe(eslint(esLintConfig))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

const compileSheetHTML = () => {
  return gulp.src('./5eShaped.html')
    .pipe(include())
    .pipe(replaceTask({
      patterns: [
        {
          match: /\x7B\x7B'([A-Za-z_0-9\.]+)'\s\|\stranslate\x7D\x7D/g,
          replacement: function ($1, $2) {
            return translate($2);
          }
        }
      ]
    }))
    .pipe(minifyHTML({
      whitespace: true
    }));
};
const compileSheetWorkers = () => {
  return gulp.src(['components/sheetWorkers.js'])
    .pipe(replaceTask({
      patterns: [
        {
          match: /(let TRANSLATIONS;)/i,
          replacement: function () {
            let translations = {
              de: JSON.parse(fs.readFileSync('./translations/de.json')),
              en: JSON.parse(fs.readFileSync('./translations/en.json')),
              fr: JSON.parse(fs.readFileSync('./translations/fr.json')),
              ru: JSON.parse(fs.readFileSync('./translations/ru.json'))
            };
            return `const TRANSLATIONS = ${JSON.stringify(translations)};`;
          }
        }
      ]
    }))
    .pipe(babel({
      presets: ['es2015'],
      comments: false,
      compact: true
    }))
    .pipe(wrapper({
      header: '<script type="text/worker">',
      footer: '</script>'
    }));
};
const compileRollTemplate = () => {
  return gulp.src(['./components/rollTemplate.html']);
};

gulp.task('compile', ['sass'], function () {
  return streamqueue({objectMode: true},
    compileSheetHTML(),
    compileSheetWorkers(),
    compileRollTemplate()
  )
    .pipe(concat('5eShaped.html'))
    .pipe(gulp.dest('../'))
});

gulp.task('submit', ['compile'], (done) => {
  const html = fs.readFileSync('../5eShaped.html', 'utf-8');
  const css = fs.readFileSync('../5eShaped.css', 'utf-8');
  const props = require('./submitProps.json');

  const url = `https://app.roll20.net/campaigns/savesettings/${props.campaignId}`;

  var j = request.jar();
  var cookie = request.cookie(`rack.session=${props.rackSessionId}`);
  j.setCookie(cookie, 'https://app.roll20.net');

  request.post({
      url,
      form: {
        customcharsheet_layout: html,
        customcharsheet_style: css,
        allowcharacterimport: false,
        bgimage: 'none',
        publicaccess: false,
        charsheettype: 'custom',
      },
      jar: j,
    },
    (err, httpResponse, body) => {
      if (httpResponse.statusCode !== 303 ||
        httpResponse.headers.location !== `https://app.roll20.net/campaigns/campaignsettings/${props.campaignId}`) {
        gutil.log('Problem submitting sheet, response headers:');
        gutil.log(httpResponse.headers);
        return done(httpResponse.statusMessage);
      }
      return done(err);
    }
  );

});
