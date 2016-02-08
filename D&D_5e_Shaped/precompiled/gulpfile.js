var gulp = require('gulp');
var include = require('gulp-include');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var replace = require('gulp-replace-task');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');
var change = require('gulp-change');
var fs = require('fs');

var traitsCount = 1;
var actionCount = 12;
var lairActionCount = 4;
var legendaryActionCount = 4;
var customClassCount = 6;
var translations = {};

String.prototype.capitalize = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1)
	});
};
String.prototype.lowercase = function () {
	return this.toLowerCase();
};

function getTranslation () {
	translations.en = JSON.parse(fs.readFileSync('./translations/en.json'));
	translations.de = JSON.parse(fs.readFileSync('./translations/de.json'));
	translations.fr = JSON.parse(fs.readFileSync('./translations/fr.json'));
	translations.ru = JSON.parse(fs.readFileSync('./translations/ru.json'));
}

function objByString (o, s) {
	s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	s = s.replace(/^\./, '');           // strip a leading dot
	var a = s.split('.');
	for (var i = 0, n = a.length; i < n; ++i) {
		var k = a[i];
		if (k in o) {
			o = o[k];
		} else {
			return;
		}
	}
	return o;
}

function getTranslationsIfTheyDontExist () {
	if(Object.keys(translations).length === 0) {
		getTranslation();
	}
}

function translationWrapper (lang, key) {
	var translation = objByString(translations[lang], key);

	if(!translation) {
		translation = objByString(translations.en, key)
	}

	return '<span class=' + lang + '>' + translation + '</span>';
}

function translate (key) {
	getTranslationsIfTheyDontExist();
	var translation = translationWrapper('en', key) + translationWrapper('de', key) + translationWrapper('fr', key) + translationWrapper('ru', key);

	return translation;
}

function actionsCompile(file, limit, type, name) {
	var template = file.contents.toString('utf8');
	var s = [];
	for (var i = 0; i < limit; i++) {
		s.push(template
				.replace(/\x7B\x7Btype\x7D\x7D/g, type)
				.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
				.replace(/\x7B\x7Bname\x7D\x7D/g, name)
		);
	}
	return s.join('\n\n');
}
function duplicate(file, limit, start) {
	var template = file.contents.toString('utf8');
	var s = [];

	if (!start) {
		start = 0;
	} else if (start > 0) {
		limit += start;
	}

	for (var i = start; i < limit; i++) {
		s.push(template
				.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
		);
	}
	return s.join('\n\n');
}

gulp.task('preCompile', function () {
	return gulp.src('./D&D_5e.html')
		.pipe(include())
		.pipe(inject(gulp.src(['./components/actions/traits.html']), {
			starttag: '<!-- inject:traits:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, traitsCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/actions/action.html']), {
			starttag: '<!-- inject:lairActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, lairActionCount, 'lair_', 'Lair');
			}
		}))
		.pipe(inject(gulp.src(['./components/actions/action.html']), {
			starttag: '<!-- inject:legendaryActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, legendaryActionCount, 'legendary_', 'Legendary');
			}
		}))
		.pipe(inject(gulp.src(['./components/actions/action.html']), {
			starttag: '<!-- inject:actions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, actionCount, '', 'Action');
			}
		}))
		.pipe(replace({
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
		}))
		.pipe(replace({
			patterns: [
				{
					match: /text\/worker/g,
					replacement: function () {
						return '"text/worker"';
					}
				}
			]
		}))
		.pipe(gulp.dest('../'));
});

var sassConfig = {
	rules: {
		'clean-import-paths': 0,
		'force-element-nesting': 0,
		'hex-length': 'long',
		'empty-line-between-blocks': 0,
		include: 0
	}
};

gulp.task('sass', function () {
	return gulp.src('./D&D_5e.scss')
		/*
		.pipe(sassLint(sassConfig))
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError())
		*/
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('../'));
});

gulp.task('minify-css', ['sass'], function () {
	return gulp.src('../D&D_5e.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('../'));
});

gulp.task('compile', ['preCompile', 'minify-css'], function () {
	return gulp.src(['../D&D_5e.html', './components/rollTemplate.html'])
		.pipe(concat('D&D_5e.html'))
		.pipe(gulp.dest('../'));
});
