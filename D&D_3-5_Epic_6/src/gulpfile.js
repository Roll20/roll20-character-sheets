const {src, dest, watch, parallel, series} = require('gulp');
const include = require('gulp-include');
const rename = require('gulp-rename');
const pug = require('gulp-pug');

function compile_pug() {
    return src('pug/*.pug')
        .pipe(pug({pretty: true}))
        .on('error', console.log)
        .pipe(dest('../generated'));
}

function bundle_html() {
    return src('html/main.html')
        .pipe(include())
        .on('error', console.log)
        .pipe(rename('dnd_3-5_epic_6.html'))
        .pipe(dest('../dist'));
}

/* Bundle the css in one big file */
function bundle_css() {
    return src('css/main.css')
        .pipe(include())
        .on('error', console.log)
        .pipe(rename('dnd_3-5_epic_6.css'))
        .pipe(dest('../dist'));
}

function copy_to_root_dir(done) {
    src('../dist/dnd_3-5_epic_6.html')
        .pipe(dest('..'));
    src('../dist/dnd_3-5_epic_6.css')
        .pipe(dest('..'));
    return done()
}

function copyTranslation(){
    return src('../translation.json')
        .pipe(dest('../dist'))
}
exports.default = series(
    compile_pug,
    copyTranslation,
    bundle_css,
    bundle_html
);

exports.build = series(
    compile_pug,
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
