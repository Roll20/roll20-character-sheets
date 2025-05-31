const {src, dest, watch, series} = require('gulp');
const include = require('gulp-include');
const rename = require('gulp-rename');

function bundle_html() {
    return src('html/main.html')
        .pipe(include())
        .on('error', console.log)
        .pipe(rename('DFRPG.html'))
        .pipe(dest('../dist'));
}

/* Bundle the css in one big file */
function bundle_css() {
    return src('css/main.css')
        .pipe(include())
        .on('error', console.log)
        .pipe(rename('DFRPG.css'))
        .pipe(dest('../dist'));
}

function copy_to_root_dir(done) {
    src('../dist/DFRPG.html')
        .pipe(dest('..'));
    src('../dist/DFRPG.css')
        .pipe(dest('..'));
    return done()
}

function copyTranslation(){
    /*return src('../translation.json')
        .pipe(dest('../dist'))*/
}
exports.default = series(
    //copyTranslation,
    bundle_css,
    bundle_html
);

exports.build = series(
    bundle_css,
    bundle_html,
    copy_to_root_dir
)

exports.watch = () => {
    watch("css/*", {ignoreInitial: false}, exports.default);
    watch("css/*/*", {ignoreInitial: false}, exports.default);
    watch("js/*", {ignoreInitial: false}, exports.default);
    watch("js/*/*", {ignoreInitial: false}, exports.default);
    watch("html/*", {ignoreInitial: false}, exports.default);
    watch("html/*/*", {ignoreInitial: false}, exports.default);
}
