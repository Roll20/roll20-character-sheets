'use strict';

const gulp = require('gulp');
const include = require('gulp-include');
const inject = require('gulp-inject');
const htmlmin = require('gulp-htmlmin');
const minifyCss = require('gulp-minify-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
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
const sortJSON = require('gulp-json-sort').default;

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

String.prototype.capitalize = () => {
  return this.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1)
  });
};
String.prototype.lowercase = () => {
  return this.toLowerCase();
};

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
const compileSheetHTML = () => {
  return gulp.src('./5eShaped.html')
    .pipe(include())
    .pipe(htmlmin({
      collapseWhitespace: true
    }));
};
const compileSheetWorkers = () => {
  return browserify('./scripts/sheetWorkers.js')
    .transform(babelify, {
      presets: ['es2015'],
      comments: false,
      compact: true
    }).bundle()
    .pipe(source('sheetWorkers.js'))
    .pipe(buffer())
    .pipe(wrapper({
      header: '<script type="text/worker">',
      footer: '</script>'
    }))
};
const compileRollTemplate = () => {
  return gulp.src('./components/rollTemplate/rollTemplate.html');
};

gulp.task('compile', ['sass', 'translationDist'], () => {
  return streamqueue({objectMode: true},
    compileSheetHTML(),
    compileSheetWorkers(),
    compileRollTemplate()
  )
    .pipe(concat('5eShaped.html'))
    .pipe(gulp.dest('../'))
});

gulp.task('lint', () => {
  return gulp.src(['./scripts/*.js', './components/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

const sassConfig = {
  rules: {
    'clean-import-paths': 0,
    'force-element-nesting': 0,
    'hex-length': 'long',
    'empty-line-between-blocks': 0,
    'nesting-depth': 0,
    'no-url-protocols': 0,
    'no-important': 0,
    'force-attribute-nesting': 0,
    'force-pseudo-nesting': 0,
    'no-qualifying-elements': 0,
    include: 0
  }
};
gulp.task('sass', () => {
  return gulp.src('./5eShaped.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest('../'));
});
gulp.task('sass-lint', () => {
  return gulp.src(['./5eShaped.scss', './styles/*.scss', './components/**/*.scss'])
    .pipe(sassLint(sassConfig))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('sort-translations', () => {
  return gulp.src('../translations/*.json')
    .pipe(sortJSON({ space: 2 }))
    .pipe(replaceTask({
      patterns: [
        {
          match: /\"\:\s\"/g,
          replacement: '":"'
        }
      ]
    }))
    .pipe(gulp.dest('../translations/'));
});

gulp.task('submit', ['compile'], (done) => {
  const html = fs.readFileSync('../5eShaped.html', 'utf-8');
  const css = fs.readFileSync('../5eShaped.css', 'utf-8');
  const translation = fs.readFileSync('../translations/en.json', 'utf-8');
  const props = require('./submitProps.json');
  const campaign = props[props.which];

  const url = `https://app.${campaign.roll20}.net/campaigns/savesettings/${campaign.campaignId}`;

  var j = request.jar();
  var cookie = request.cookie(`rack.session=${props.rackSessionId}`);
  j.setCookie(cookie, `https://app.${campaign.roll20}.net`);

  request.post({
      url,
      form: {
        customcharsheet_layout: html,
        customcharsheet_style: css,
        customcharsheet_translation: translation,
        allowcharacterimport: false,
        bgimage: 'none',
        publicaccess: false,
        charsheettype: 'custom',
        compendium_override: 'dnd5e',
      },
      jar: j,
    },
    (err, httpResponse, body) => {
      if (httpResponse.statusCode !== 303 ||
        httpResponse.headers.location !== `https://app.${campaign.roll20}.net/campaigns/campaignsettings/${campaign.campaignId}`) {
        gutil.log('Problem submitting sheet, response headers:');
        gutil.log(httpResponse.headers);
        return done(httpResponse.statusMessage);
      }
      return done(err);
    }
  );
});

gulp.task('translationDist', () => {
  return gulp.src('../translations/en.json')
    .pipe(rename('translation.json'))
    .pipe(gulp.dest('../'));
});
