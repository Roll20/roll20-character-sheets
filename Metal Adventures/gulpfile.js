var gulp = require('gulp'),
    replace = require('gulp-replace'),
    htmltidy = require('gulp-htmltidy');

gulp.task('html', function () {
    var options = {
        doctype: 'html5',
        hideComments: true,
        indent: true
    };

    gulp.src(['MetalAdventures.html'])
        .pipe(replace('<!--  HEADER -->', `
        <!doctype html>
        <html>
        
        <head>
            <title>test</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="MetalAdventures.css">
        </head>
        
        <body>`))
        .pipe(replace('<!--  FOOTER -->', `
        </body>
        </html>`))
        .pipe(htmltidy(options))
        .pipe(gulp.dest('build/'));
});

gulp.task('css', function () {
    gulp.src(['MetalAdventures.css'])
        .pipe(replace('.sheet-', '.'))
        .pipe(gulp.dest('build/'));
});

gulp.task('default', ['html', 'css']);