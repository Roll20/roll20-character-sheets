var gulp = require('gulp'),
	include = require('gulp-include'),
	inject = require('gulp-inject');


var numberOfActions = 12,
	numberOfLairActions = 4,
	numberOfLegendaryActions = 4,
	numberOfWeapons = 7;


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
function duplicate (file, limit) {
	var template = file.contents.toString('utf8'),
		s = [];
	for (var i = 0; i < limit; i++) {
		s.push(template
			.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
		);
	}
	return s.join('\n\n');
}


gulp.task('compile', function() {
	gulp.src('precompiled/D&D_5e.html')
		.pipe( include() )
		.pipe( inject(gulp.src(['precompiled/components/actions/actions.html']), {
			starttag: '<!-- inject:lairActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, numberOfLairActions, 'lair_', 'Lair');
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/actions/actions.html']), {
			starttag: '<!-- inject:legendaryActions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, numberOfLegendaryActions, 'legendary_', 'Legendary');
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/actions/actions.html']), {
			starttag: '<!-- inject:actions:{{ext}} -->',
			transform: function (filePath, file) {
				return actionsCompile(file, numberOfActions, '', 'Action');
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/weapons/melee.html']), {
			starttag: '<!-- inject:melee:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, numberOfWeapons);
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/weapons/ranged.html']), {
			starttag: '<!-- inject:ranged:{{ext}} -->',
			transform: function (filePath, file) {
				return duplicate(file, numberOfWeapons);
			}
		}))
		.pipe( gulp.dest('./') )
});