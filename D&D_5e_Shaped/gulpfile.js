var gulp = require('gulp'),
		fileinclude = require('gulp-file-include'),
		include = require('gulp-include');



gulp.task('include', function() {
	gulp.src('precompiled/D&D_5e.html')
			.pipe( include() )
			.pipe( gulp.dest('./') )
});