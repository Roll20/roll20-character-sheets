const fs = require('fs'); // used to read and write files
const path = require('path'); // used to resolve file paths
const {minify} = require('html-minifier'); // used to minify HTML
const chokidar = require('chokidar'); // used to watch for src file changes
const argv = require('minimist')(process.argv.slice(2)); // used to parse command-line arguments
const htmlInput = 'index.html';
const isProduction = argv.prod; // --prod flag
const isDevelopment = argv.dev; // --dev flag
const bundledOutput = path.resolve(__dirname, '../1ESheet.html'); // final output file in the root folder

function bundle(isProduction) {
  const jsInput = isProduction ? 'prod/index.js' : 'dev/index.js'; // conditional JS input

  try {
    const html = fs.readFileSync(htmlInput, 'utf8');
    const js = fs.readFileSync(jsInput, 'utf8');
    let minifiedHTML = html; // original HTML
    let injectedHTML = '';
    // Minify only in production
    if (isProduction) {
      minifiedHTML = minify(html, {
        collapseWhitespace: true,
        minifyJS: true,
      });
      injectedHTML = minifiedHTML.replace(/<script type="text\/worker"><\/script>/, `\r<script type="text/worker">${js.trim()}</script>`);
    } else {
      injectedHTML = minifiedHTML.replace(/<script type="text\/worker"><\/script>/, `\r<script type="text/worker">\r${js.trim()}\r</script>`);
    }

    fs.writeFileSync(bundledOutput, injectedHTML, 'utf8');
    console.log(`${isProduction ? 'Production' : 'Development'} build complete!`);
  } catch (err) {
    console.error('Error during build:', err);
  }
}

// initial build
bundle(isProduction);

// watch src files only in development
if (isDevelopment) {
  chokidar.watch([htmlInput, isProduction ? null : 'dev/index.js'].filter(Boolean)).on('change', (path) => {
    console.log(`File ${path} has been changed`);
    bundle(isProduction);
  });
  console.log('Watching for changes...');
}
