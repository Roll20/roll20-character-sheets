var gulp = require('gulp'),
	include = require('gulp-include'),
	inject = require('gulp-inject');


var numberOfWeapons = 7;


gulp.task('compile', function() {
	gulp.src('precompiled/D&D_5e.html')
		.pipe( include() )
		.pipe( inject(gulp.src(['precompiled/components/weapons/melee.html']), {
			starttag: '<!-- inject:melee:{{ext}} -->',
			transform: function (filePath, file) {
				var template = file.contents.toString('utf8'),
					s = '';
				for (var i = 0; i < numberOfWeapons; i++) {
					s += template.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString())
					if(i !== numberOfWeapons - 1) {
						s += '\n\n';
					}
				}
				return s;
			}
		}))
		.pipe( inject(gulp.src(['precompiled/components/weapons/ranged.html']), {
			starttag: '<!-- inject:ranged:{{ext}} -->',
			transform: function (filePath, file) {
				var template = file.contents.toString('utf8'),
					s = '';
				for (var i = 0; i < numberOfWeapons; i++) {
					s += template.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString());
					if(i !== numberOfWeapons - 1) {
						s += '\n\n';
					}
				}
				return s;
			}
		}))
		.pipe( gulp.dest('./') )
});