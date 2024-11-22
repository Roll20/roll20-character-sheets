const {src, dest, parallel, series} = require('gulp')
const include = require('gulp-include')
const rename = require('gulp-rename')

/* Bundle the html in one big file, including the js file compilated earlier */
function bundle_html(done){
    src('html/main.html')
        .pipe(include())
        .on('error',console.log)
        .pipe(rename('StarWars5e_HTML.html'))
        .pipe(dest('../dist'));
    done();
}

/* Bundle the css in one big file */
function bundle_css(done){
    src('css/legacy.css')
        .pipe(rename('StarWars5e_CSS.css'))
        .pipe(dest('../dist'));
    done();
}

function copy_to_root_dir(done){
    src('../dist/StarWars5e_HTML.html')
        .pipe(dest('..'));
    src('../dist/StarWars5e_CSS.css')
        .pipe(dest('..'));
    done();
}

exports.default = series(
    bundle_css,
    bundle_html
);

exports.build = series (
    bundle_css,
    bundle_html,
    copy_to_root_dir
)