const {src, dest, parallel, series} = require('gulp')
const include = require('gulp-include')
const rename = require('gulp-rename')

/* Bundle the javascript in one big file */
function bundle_js(cb){
    console.log("Building Javascript :")
    console.log("\t- Nothing to see/do here")
    cb();
}

/* Bundle the html in one big file, including the js file compilated earlier */
function bundle_html(done){
    console.log("Building HTML :");
    src('html/main.html')
        .pipe(include())
        .on('error',console.log)
        .pipe(rename('StarWars5e_HTML.html'))
        .pipe(dest('../dist'));
    console.log("\t- done");
    done();
}

/* Bundle the css in one big file */
function bundle_css(done){
    console.log("Building CSS :");
    src('css/legacy.css')
        .pipe(rename('StarWars5e_CSS.css'))
        .pipe(dest('../dist'))
    console.log("\t- done");
    done();
}

exports.default = series(
    parallel(
        bundle_js,
        bundle_css
    ),
    bundle_html
);