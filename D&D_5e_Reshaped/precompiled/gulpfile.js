var gulp = require('gulp');
var include = require('gulp-include');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var replace = require('gulp-replace-task');
var rename = require('gulp-rename');
var wrap = require('gulp-wrap');
var change = require('gulp-change');
var fs = require('fs');

var customSkillCount = 6;
var traitsCount = 1;
var actionCount = 12;
var lairActionCount = 4;
var legendaryActionCount = 4;
var customClassCount = 6;
var abilitiesName = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
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

function skillEn (key) {
	getTranslationsIfTheyDontExist();
	return objByString(translations.en, key);
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
function skills(file) {
	var template = file.contents.toString('utf8');
	var skillsJson = require('./components/skills/skills.json').skills;
	var skills = [];

	skillsJson.forEach(function (skill) {
		skills.push(template
				.replace(/\x7B\x7Bname\x7D\x7D/g, skill.name.lowercase().replace(/ +/g, ''))
				.replace(/\x7B\x7Battribute\x7D\x7D/g, skill.attribute)
				.replace(/\x7B\x7BattributeShort\x7D\x7D/g, skill.attribute.substring(0,3).capitalize())
				.replace(/\x7B\x7BattributeTranslated\x7D\x7D/g, translate('ABILITIES.' + skill.attribute + '.SHORT_NAME_CAPITAL'))
				.replace(/\x7B\x7BnameTranslatedEn\x7D\x7D/g, skillEn('SKILLS.' + skill.name + '.NAME'))
				.replace(/\x7B\x7BnameTranslated\x7D\x7D/g, translate('SKILLS.' + skill.name + '.NAME'))
		);
	});
	return skills.join('\n\n');
}

function saveQuery(file) {
	var template = file.contents.toString('utf8');
	var query = '';

	for (var i = 0; i < abilitiesName.length; ++i) {
		var ability = abilitiesName[i];
		query += '|' + ability + ', {{title=' + ability + '&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + @{' + ability.toLowerCase() + '_save_mod}]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + @{' + ability.toLowerCase() + '_save_mod}]]&amp;#125;&amp;#125;';
	}
	query += '|Death, {{deathsave=1&amp;#125;&amp;#125; {{emote=dices with death!&amp;#125;&amp;#125; {{title=Death Save&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + (@{global_saving_bonus})]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + (@{global_saving_bonus})]]&amp;#125;&amp;#125;';
	query += '|Other, {{title=?{Other&amp;#124;Unspecified&amp;#125;&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + (@{global_saving_bonus}) + ?{Modifiers&amp;#124;0&amp;#125;]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + (@{global_saving_bonus}) + ?{Modifiers&amp;#124;0&amp;#125;]]&amp;#125;&amp;#125;';

	template = template.replace(/\x7B\x7BsaveQuery\x7D\x7D/g, query);
	return template;
}

function checkQuery(file) {
	var template = file.contents.toString('utf8');
	var skillsJson = require('./components/skills/skills.json').skills;
	var query = '';

	skillsJson.forEach(function (skill) {
		var skillName = skill.name.lowercase().replace(/ +/g, '');
		query += '|' + skill.name + ' (' + skill.attribute.capitalize() + ') , {{title=' + skill.name + '&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + @{' + skillName + '}]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + @{' + skillName + '}]]&amp;#125;&amp;#125;'
	});
	for (var i = 1, len = customSkillCount; i <= len; ++i) {
		var skillName = '@{custom_skill_' + i + '_name}';

		query += '|' + skillName + ', {{title=' + skillName + '&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + @{custom_skill_' + i + '}]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + @{custom_skill_' + i + '}]]&amp;#125;&amp;#125;'
	}
	query += '|-';
	for (var i = 0; i < abilitiesName.length; ++i) {
		var ability = abilitiesName[i];
		query += '|' + ability + ', {{title=' + ability + '&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + @{' + ability.toLowerCase() + '_check_mod}]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + @{basic_' + ability.toLowerCase() + '_check_mod}]]&amp;#125;&amp;#125;';
	}
	query += '|Other, {{title=?{Other&amp;#124;Unspecified&amp;#125;&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + ?{Modifiers&amp;#124;0&amp;#125;]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + ?{Modifiers&amp;#124;0&amp;#125;]]&amp;#125;&amp;#125; ';

	return template.replace(/\x7B\x7BcheckQuery\x7D\x7D/g, query);
}

function ordinal(d) {
	if (d > 3 && d < 21) return 'th';
	switch (d % 10) {
		case 1:
			return 'st';
		case 2:
			return 'nd';
		case 3:
			return 'rd';
		default:
			return 'th';
	}
}
function processDate() {
	var dt = new Date();
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var month = dt.getMonth();
	var date = dt.getDate();
	var year = dt.getFullYear();

	return date + ordinal(date) + ' ' + months[month] + ' ' + year;
}

gulp.task('preCompile', function () {
	return gulp.src('./D&D_5e.html')
		.pipe(replace({
			patterns: [
				{
					match: /\x7B\x7Bdate\x7D\x7D/g,
					replacement: function () {
						return processDate();
					}
				}
			]
		}))
		.pipe(include())
		.pipe(inject(gulp.src(['./components/skills/skill.html']), {
			starttag: '<!-- inject:skills:{{ext}} -->',
			transform: function (filePath, file) {
				return skills(file);
			}
		}))
		.pipe(inject(gulp.src(['./components/skills/skill_bonuses.html']), {
			starttag: '<!-- inject:skillsBonuses:{{ext}} -->',
			transform: function (filePath, file) {
				return skills(file);
			}
		}))
		.pipe(inject(gulp.src(['./components/skills/custom_skill.html']), {
			starttag: '<!-- inject:customSkills:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, customSkillCount, 1);
			}
		}))
		.pipe(inject(gulp.src(['./components/skills/custom_skill_bonuses.html']), {
			starttag: '<!-- inject:customSkillsBonuses:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, customSkillCount, 1);
			}
		}))
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
		.pipe(inject(gulp.src(['./components/class/custom_class.html']), {
			starttag: '<!-- inject:custom_class:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, customClassCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/macros/saves.html']), {
			starttag: '<!-- inject:saveQuery:{{ext}} -->',
			transform: function (filePath, file) {
				return saveQuery(file);
			}
		}))
		.pipe(inject(gulp.src(['./components/macros/checks.html']), {
			starttag: '<!-- inject:checkQuery:{{ext}} -->',
			transform: function (filePath, file) {
				return checkQuery(file);
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

gulp.task('sass', function () {
	return gulp.src('./D&D_5e.scss')
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
