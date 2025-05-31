const { src, dest, watch, parallel, series } = require('gulp')
const terser     = require('gulp-terser')
const htmlmin    = require('gulp-htmlmin')
const cleanCss   = require('gulp-clean-css')
const sass       = require('gulp-sass')
const rename     = require('gulp-rename')
const replace    = require('gulp-just-replace')
const wrap       = require('gulp-wrap')
const nunjucks   = require('gulp-nunjucks')
const constants  = require('./constants.js')

// TODO: Generate icon font automatically:
// https://www.npmjs.com/package/gulp-iconfont
// https://www.npmjs.com/package/gulp-svg2ttf
// https://www.npmjs.com/package/gulp-ttf2woff

const buildDir = 'build' // for intermediate build results
const compress = true
let buildType = 'preview'

function targetDir() {
    switch(buildType) {
        case 'preview': return '../preview';
        case 'release': return '..';
    }
}

function sourceMaps() {
    switch(buildType) {
        case 'preview': return '.';
        case 'release': return false;
        // If true, writes inline sourcemaps to the output file.  Specifying a
        // string path will write external sourcemaps at the given path.
    }
}

function sheetWorkers() {
    let pipe = src('sheet-workers.js')
    if(compress) {
        pipe = pipe.pipe(terser({
            warnings: true,
            mangle:   true,
            compress: true,
            toplevel: true // also optimize top level variables
        }))
    }
    return pipe
        .pipe(wrap('{% raw %}<script type="text/worker">\n<%= contents %>\n</script>{% endraw %}'))
        .pipe(rename('sheet-workers.html'))
        .pipe(dest(buildDir))
}
exports.sheetWorkers = sheetWorkers

function html() {
    const n = require('nunjucks')
    const searchPaths = ['html', buildDir]
    // targetDir() is used so sheet-workers.html can be found.
    const env = new n.Environment(new n.FileSystemLoader(searchPaths),
                                  {autoescape: false,
                                   throwOnUndefined: false})
    env.addGlobal('preview', buildType === 'preview')
    env.addGlobal('constants', constants)

    let pipe = src('html/main.html', { sourcemaps: sourceMaps() !== false })
                .pipe(nunjucks.compile({}, {env: env}))

    if(compress) {
        pipe = pipe.pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            conservativeCollapse: true,
            quoteCharacter: '"',
            removeAttributeQuotes: false, // Roll20 needs this
            removeComments: true,
            removeEmptyAttributes: true,
            // removeRedundantAttributes: true // would remove attributes which are needed by Roll20
       }))
    }

    return pipe
        .pipe(rename('sheet.html'))
        .pipe(dest(targetDir(), { sourcemaps: sourceMaps() }))
}
exports.html = html

function css() {
    let pipe = src('style/main.scss', { sourcemaps: sourceMaps() !== false })
        .pipe(sass().on('error', sass.logError))

    if(compress) {
        pipe = pipe.pipe(cleanCss())
    }

    return pipe
       .pipe(replace([{search: '@charset "UTF-8";', // Roll20 somehow doesn't like this
                       replacement: ''}]))
       .pipe(rename('sheet.css'))
       .pipe(dest(targetDir(), { sourcemaps: sourceMaps() }))
}
exports.css = css

const buildEverything = parallel(series(sheetWorkers,
                                        html),
                                        css)
exports.default = buildEverything

function auto() {
    buildEverything()
    watch('sheet-workers.js', sheetWorkers)
    watch('html/*', html)
    watch('style/*', css)
}
exports.auto = auto

function release(cb) {
    buildType = 'release'
    return buildEverything(cb)
}
exports.release = release
