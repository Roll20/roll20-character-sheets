var gulp = require('gulp'),
	include = require('gulp-include'),
	inject = require('gulp-inject');

var customSkillCount = 4,
	actionCount = 12,
	lairActionCount = 4,
	legendaryActionCount = 4,
	weaponCount = 7,
	classActionsPerPage = 10,
	customClassCount = 6,
	spellCount = 9,
	armorCount = 10,
	inventoryPerPage = 15;

String.prototype.capitalize = function() {
	return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1)});
};
String.prototype.lowercase = function() {
	return this.toLowerCase();
};

function actionsCompile (file, limit, action_type, action_name) {
	var template = file.contents.toString('utf8'),
		s = [];
	for (var i = 0; i < limit; i++) {
		s.push(template
			.replace(/\x7B\x7Baction_type\x7D\x7D/g, action_type)
			.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
			.replace(/\x7B\x7Baction_name\x7D\x7D/g, action_name)
		);
	}
	return s.join('\n\n');
}
function duplicate (file, limit, start) {
	var template = file.contents.toString('utf8'),
		s = [];

	if(!start) {
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
function skills (file) {
	var template = file.contents.toString('utf8'),
		skillsJson = require('./precompiled/components/skills/skills.json').skills,
		//skillsData = JSON.parse('precompiled/components/skills/skills.json'),
		skills = [];

	var selectedString = ' selected="selected"';

	skillsJson.forEach(function(skill) {
		var ggTemplate = template;
		if(skill.attribute === 'str') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bstr_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bstr_selected\x7D\x7D/g, '');
		}
		if(skill.attribute === 'dex') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bdex_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bdex_selected\x7D\x7D/g, '');
		}
		if(skill.attribute === 'con') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bcon_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bcon_selected\x7D\x7D/g, '');
		}
		if(skill.attribute === 'int') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bint_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bint_selected\x7D\x7D/g, '');
		}
		if(skill.attribute === 'wis') {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bwis_selected\x7D\x7D/g, selectedString);
		} else {
			ggTemplate = ggTemplate.replace(/\x7B\x7Bwis_selected\x7D\x7D/g, '');
		}
		if(skill.attribute === 'cha') {
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
				.replace(/\x7B\x7Bdescription\x7D\x7D/g, skill.description)
				.replace(/\x7B\x7Bdescription_de\x7D\x7D/g, skill.description_de)
		);
	});
	return skills.join('\n\n');
}

gulp.task('compile', function() {
	gulp.src('precompiled/D&D_5e.html')
		.pipe( include() )
		.pipe( inject(gulp.src(['precompiled/components/skills/skill.html']), {
			starttag: '<!-- inject:skills:{{ext}} -->',
			transform: function (filePath, file) {
				return skills(file);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/skills/custom_skill.html']), {
			starttag: '<!-- inject:customSkills:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, customSkillCount, 1);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/actions/actions.html']), {
			starttag: '<!-- inject:lairActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, lairActionCount, 'lair_', 'Lair');
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/actions/actions.html']), {
			starttag: '<!-- inject:legendaryActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, legendaryActionCount, 'legendary_', 'Legendary');
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/actions/actions.html']), {
			starttag: '<!-- inject:actions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, actionCount, '', 'Action');
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/quick_weapons/melee_template.html']), {
			starttag: '<!-- inject:quickMelee:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, weaponCount);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/weapons/melee.html']), {
			starttag: '<!-- inject:melee:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, weaponCount);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/quick_weapons/ranged_template.html']), {
			starttag: '<!-- inject:quickRanged:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, weaponCount);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/weapons/ranged.html']), {
			starttag: '<!-- inject:ranged:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, weaponCount);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/class/class_action.html']), {
			starttag: '<!-- inject:class_1:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, classActionsPerPage, 1);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/class/class_action.html']), {
			starttag: '<!-- inject:class_2:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, classActionsPerPage, 1 + classActionsPerPage);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/class/custom_class.html']), {
			starttag: '<!-- inject:custom_class:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, customClassCount, 1);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/spellbook/spell-page.html']), {
			starttag: '<!-- inject:spells:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, spellCount, 1);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/armor/armor.html']), {
			starttag: '<!-- inject:armor:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, armorCount, 1);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/inventory/inventory.html']), {
			starttag: '<!-- inject:inventory_1:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, inventoryPerPage, 1);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/inventory/inventory.html']), {
			starttag: '<!-- inject:inventory_2:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, inventoryPerPage, 1 + inventoryPerPage);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/inventory/inventory.html']), {
			starttag: '<!-- inject:inventory_3:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, inventoryPerPage, 1 + inventoryPerPage + inventoryPerPage);
			}
		}))
		.pipe( gulp.dest('./') )
});