const {src, dest, watch, series} = require('gulp')
const include = require('gulp-include')
const rename = require('gulp-rename')
const Stream = require('stream')
const PluginError = require('plugin-error')
const cssbeautify = require('gulp-cssbeautify');
const pug = require('gulp-pug');

function compile_pug(done) {
    src('pug/*.pug')
        .pipe(pug({pretty: true}))
        .on('error', console.log)
        .pipe(dest('generated'));
    done();
}
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
function bundle_css(){
    return src('css/main.css')
        .pipe(include())
        .pipe(flattenCSS())
        .pipe(cssbeautify())
        .on('error',console.log)
        .pipe(rename('StarWars5e_CSS.css'))
        .pipe(dest('../dist'));
}

function copy_to_root_dir(done){
    src('../dist/StarWars5e_HTML.html')
        .pipe(dest('..'));
    src('../dist/StarWars5e_CSS.css')
        .pipe(dest('..'));
    done();
}

exports.default = series(
    compile_pug,
    bundle_css,
    bundle_html
);

exports.build = series (
    compile_pug,
    bundle_css,
    bundle_html,
    copy_to_root_dir
)

exports.watch = () => {
    watch("css/*",{ ignoreInitial: false },exports.default);
    watch("css/*/*",{ ignoreInitial: false },exports.default);
    watch("js/*",{ ignoreInitial: false },exports.default);
    watch("js/*/*",{ ignoreInitial: false },exports.default);
    watch("html/*",{ ignoreInitial: false },exports.default);
    watch("html/*/*",{ ignoreInitial: false },exports.default);
}

function flattenCSS(obj, options) {
    options = options || {};

    var stream = new Stream.Transform({objectMode: true});


    stream._transform = async function (file, encoding, callback) {
        const { default: flatten } = await import('css-flatten');

        if (file.isNull()) {
            throw new PluginError('custom-flatten', 'File is null!');
        }

        if (file.isStream()) {
            throw new PluginError('custom-flatten', 'Streams are not supported!');
        }
        try {
            const input = file.contents.toString();
            const output = flatten(input);
            file.contents = Buffer.from(output, encoding);
            callback(null, file);
        } catch (err) {
            console.error(err);
            throw new PluginError('custom-flatten', err);
        }
    };

    return stream;
}