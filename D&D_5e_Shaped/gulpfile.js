var gulp = require('gulp'),
	include = require('gulp-include'),
	inject = require('gulp-inject');



gulp.task('include', function() {
	gulp.src('precompiled/D&D_5e.html')
			.pipe( include() )
			.pipe( inject(gulp.src(['precompiled/components/meleewpn.html']), {
				starttag: '<!-- inject:meleewpn:{{ext}} -->',
				transform: function (filePath, file) {
					var template = file.contents.toString('utf8');
					var s = "";
					for (var i = 0; i < 7; i++) {
						s += template.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString());
					}
					return s;
				}
			}))
			.pipe( inject(gulp.src(['precompiled/components/rangedwpn.html']), {
				starttag: '<!-- inject:rangedwpn:{{ext}} -->',
				transform: function (filePath, file) {
					var template = file.contents.toString('utf8');
					var s = "";
					for (var i = 0; i < 7; i++) {
						s += template.replace(/\x7B\x7Bnum\x7D\x7D/g, i.toString());
					}
					return s;
				}
			}))
			.pipe( gulp.dest('./') )
});