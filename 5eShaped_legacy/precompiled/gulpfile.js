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

var customSkillCount = 4;
var traitsCount = 1;
var actionCount = 12;
var lairActionCount = 4;
var legendaryActionCount = 4;
var meleeCount = 7;
var rangedCount = 4;
var quickClassActions = 5;
var classActionsPerPage = 10;
var customClassCount = 6;
var spellCount = 10;
var armorCount = 6;
var inventoryPerPage = 20;
var abilitiesName = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

String.prototype.capitalize = function () {
	return this.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1)
	});
};
String.prototype.lowercase = function () {
	return this.toLowerCase();
};

function actionsCompile(file, limit, action_type, action_name) {
	var template = file.contents.toString('utf8');
	var s = [];
	for (var i = 0; i < limit; i++) {
		s.push(template
				.replace(/\x7B\x7Baction_type\x7D\x7D/g, action_type)
				.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
				.replace(/\x7B\x7Baction_name\x7D\x7D/g, action_name)
		);
	}
	return s.join('\n\n');
}
function spell(file, limit, start) {
	var s = [];

	if (!start) {
		start = 0;
	} else if (start > 0) {
		limit += start;
	}

	for (var i = start; i < limit; i++) {
		var template = file.contents.toString('utf8').replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString());

		if (i === 0) {
			template = template
				.replace(/\x7B\x7Blevel_num\x7D\x7D/g, 'cantrip')
				.replace(/\x7B\x7Blevel_num_readable\x7D\x7D/g, 'Cantrip')
				.replace(/\x7B\x7Blevel_num_readable_de\x7D\x7D/g, 'Zaubertrick')
				.replace(/\x7B\x7Blevel_num_readable_fr\x7D\x7D/g, 'Cantrip')
				.replace(/\x7B\x7Bhidden_if_cantrip\x7D\x7D/g, ' sheet-hidden')
				.replace(/\x7B\x7Bchecked_if_cantrip\x7D\x7D/g, ' checked')
				.replace(/\x7B\x7BhigherLevelQuery\x7D\x7D/g, '');
		} else {
			var higherLevelQuery = '?{Spell Level';
			for (var j = i; j < limit; j++) {
				higherLevelQuery += '|' + j;
			}
			higherLevelQuery += '}';

			template = template
				.replace(/\x7B\x7Blevel_num\x7D\x7D/g, 'level' + i.toString())
				.replace(/\x7B\x7Blevel_num_readable\x7D\x7D/g, 'Level ' + i.toString())
				.replace(/\x7B\x7Blevel_num_readable_de\x7D\x7D/g, 'Stufe ' + i.toString())
				.replace(/\x7B\x7Blevel_num_readable_fr\x7D\x7D/g, 'Niveau ' + i.toString())
				.replace(/\x7B\x7Bhidden_if_cantrip\x7D\x7D/g, '')
				.replace(/\x7B\x7Bchecked_if_cantrip\x7D\x7D/g, '')
				.replace(/\x7B\x7BhigherLevelQuery\x7D\x7D/g, higherLevelQuery);
		}

		s.push(template);
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

	var selectedString = ' selected="selected"';

	skillsJson.forEach(function (skill) {
		var ggTemplate = template;
		if (skill.attribute === 'str') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bstr_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bstr_selected\x7D\x7D/g, '');
		}
		if (skill.attribute === 'dex') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bdex_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bdex_selected\x7D\x7D/g, '');
		}
		if (skill.attribute === 'con') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bcon_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bcon_selected\x7D\x7D/g, '');
		}
		if (skill.attribute === 'int') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bint_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bint_selected\x7D\x7D/g, '');
		}
		if (skill.attribute === 'wis') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bwis_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bwis_selected\x7D\x7D/g, '');
		}
		if (skill.attribute === 'cha') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bcha_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bcha_selected\x7D\x7D/g, '');
		}

		skills.push(ggTemplate
				.replace(/\x7B\x7Bname\x7D\x7D/g, skill.name.lowercase().replace(/ +/g, ''))
				.replace(/\x7B\x7Bname_cap\x7D\x7D/g, skill.name.capitalize().replace(/ +/g, ''))
				.replace(/\x7B\x7Battribute\x7D\x7D/g, skill.attribute.capitalize())
				.replace(/\x7B\x7Bfriendly_name\x7D\x7D/g, skill.name)
				.replace(/\x7B\x7Bfriendly_name_de\x7D\x7D/g, skill.name_de)
				.replace(/\x7B\x7Bfriendly_name_fr\x7D\x7D/g, skill.name_fr)
				.replace(/\x7B\x7Bdescription\x7D\x7D/g, skill.description)
				.replace(/\x7B\x7Bdescription_de\x7D\x7D/g, skill.description_de)
				.replace(/\x7B\x7Bdescription_fr\x7D\x7D/g, skill.description_fr)
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
	query += '|Death, {{deathsave=1&amp;#125;&amp;#125; {{emote=dices with death!&amp;#125;&amp;#125; {{title=Death Save&amp;#125;&amp;#125; {{rollname=Death Save&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + (@{global_saving_bonus})]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + (@{global_saving_bonus})]]&amp;#125;&amp;#125;';
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
		query += '|' + ability + ', {{title=' + ability + '&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + @{basic_' + ability.toLowerCase() + '_check_mod}]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + @{basic_' + ability.toLowerCase() + '_check_mod}]]&amp;#125;&amp;#125;';
	}
	query += '|Other, {{title=?{Other&amp;#124;Unspecified&amp;#125;&amp;#125;&amp;#125; {{roll=[[d20@{d20_mod} + ?{Modifiers&amp;#124;0&amp;#125;]]&amp;#125;&amp;#125; {{rolladv=[[d20@{d20_mod} + ?{Modifiers&amp;#124;0&amp;#125;]]&amp;#125;&amp;#125; ';

	return template.replace(/\x7B\x7BcheckQuery\x7D\x7D/g, query);
}

function meleeQuery(file) {
	var template = file.contents.toString('utf8');
	var query = '';

	for (var i = 0; i < meleeCount; ++i) {
		var weaponName = '@{repeating_weapons_melee_' + i + '_name}';

		query += '|' + weaponName + ', {{title=' + weaponName + '&amp;#125;&amp;#125;'
	}

	return template.replace(/\x7B\x7BmeleeQuery\x7D\x7D/g, query);
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

gulp.task('sheetWorkers', function () {
	return gulp.src(['./components/sheetWorkers/sheetWorkers.js'])
		.pipe(uglify())
		.pipe(wrap('<script type="text/worker">\n<%= contents %>\n</script>'))
		.pipe(rename('sheetWorkers.html'))
		.pipe(gulp.dest('./'));
});

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
		.pipe(inject(gulp.src(['./components/traits/traits.html']), {
			starttag: '<!-- inject:traits:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, traitsCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/actions/actions.html']), {
			starttag: '<!-- inject:lairActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, lairActionCount, 'lair_', 'Lair');
			}
		}))
		.pipe(inject(gulp.src(['./components/actions/actions.html']), {
			starttag: '<!-- inject:legendaryActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, legendaryActionCount, 'legendary_', 'Legendary');
			}
		}))
		.pipe(inject(gulp.src(['./components/quick_weapons/actions_template.html']), {
			starttag: '<!-- inject:quickActions:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, actionCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/actions/actions.html']), {
			starttag: '<!-- inject:actions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, actionCount, '', 'Action');
			}
		}))
		.pipe(inject(gulp.src(['./components/quick_weapons/melee_template.html']), {
			starttag: '<!-- inject:quickMelee:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, meleeCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/weapons/melee.html']), {
			starttag: '<!-- inject:melee:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, meleeCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/quick_weapons/ranged_template.html']), {
			starttag: '<!-- inject:quickRanged:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, rangedCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/weapons/ranged.html']), {
			starttag: '<!-- inject:ranged:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, rangedCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/class/class_action.html']), {
			starttag: '<!-- inject:class_1:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, classActionsPerPage, 1);
			}
		}))
		.pipe(inject(gulp.src(['./components/class/quick_class_action.html']), {
			starttag: '<!-- inject:quickClassActions:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, quickClassActions, 1);
			}
		}))
		.pipe(inject(gulp.src(['./components/class/class_action.html']), {
			starttag: '<!-- inject:class_2:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, classActionsPerPage, 1 + classActionsPerPage);
			}
		}))
		.pipe(inject(gulp.src(['./components/class/custom_class.html']), {
			starttag: '<!-- inject:custom_class:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, customClassCount, 1);
			}
		}))
		.pipe(inject(gulp.src(['./components/spells/spell-page.html']), {
			starttag: '<!-- inject:spells:{{ext}} -->',
			transform: function (filePath, file) {
				return spell(file, spellCount);
			}
		}))
		.pipe(inject(gulp.src(['./components/armor/armor.html']), {
			starttag: '<!-- inject:armor:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, armorCount, 1);
			}
		}))
		.pipe(inject(gulp.src(['./components/inventory/inventory.html']), {
			starttag: '<!-- inject:inventory_1:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, inventoryPerPage, 1);
			}
		}))
		.pipe(inject(gulp.src(['./components/inventory/inventory.html']), {
			starttag: '<!-- inject:inventory_2:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, inventoryPerPage, 1 + inventoryPerPage);
			}
		}))
		.pipe(inject(gulp.src(['./components/inventory/inventory.html']), {
			starttag: '<!-- inject:inventory_3:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, inventoryPerPage, 1 + inventoryPerPage + inventoryPerPage);
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
		.pipe(inject(gulp.src(['./components/macros/weapons/melee.html']), {
			starttag: '<!-- inject:meleeWeaponQuery:{{ext}} -->',
			transform: function (filePath, file) {
				return meleeQuery(file);
			}
		}))
		.pipe(minifyHTML({
			whitespace: true
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
	return gulp.src(['../D&D_5e.html', './pages/roll_template.html'])
		.pipe(concat('D&D_5e.html'))
		.pipe(gulp.dest('../'));
});
