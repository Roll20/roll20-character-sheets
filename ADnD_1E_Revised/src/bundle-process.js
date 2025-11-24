const fs = require('fs');
const path = require('path');
const {minify} = require('html-minifier-terser');
const chokidar = require('chokidar');
const argv = require('minimist')(process.argv.slice(2));

const htmlInput = 'index.html';
const jsInput = 'index.js'; // Source JS file
const devJsOutput = 'dev/index.js'; // Destination for dev JS
const prodJsInput = 'prod/index.js'; // Input for prod build

const isProduction = argv.prod;
const isDevelopment = argv.dev;
const bundledOutput = path.resolve(__dirname, '../1ESheet.html'); // final output file in the root folder

// --- Function to copy JS for development ---
function copyDevJs() {
  try {
    // Ensure the 'dev' directory exists
    if (!fs.existsSync('dev')) {
      fs.mkdirSync('dev');
    }
    fs.copyFileSync(jsInput, devJsOutput);
    console.log(`Copied ${jsInput} to ${devJsOutput}`);
  } catch (err) {
    console.error(`Error copying ${jsInput}:`, err);
  }
}

// --- Main bundle function ---
async function bundle() {
  const jsPath = isProduction ? prodJsInput : devJsOutput;

  try {
    const html = fs.readFileSync(htmlInput, 'utf8');
    const js = fs.readFileSync(jsPath, 'utf8');
    let injectedHTML;

    if (isProduction) {
      const minifiedHTML = await minify(html, {
        collapseWhitespace: true,
        minifyJS: true,
        removeComments: true,
      });
      injectedHTML = minifiedHTML.replace(/<script type="text\/worker"><\/script>/, `<script type="text/worker">${js.trim()}</script>`);
    } else {
      injectedHTML = html.replace(/<script type="text\/worker"><\/script>/, `<script type="text/worker">\r\n${js.trim()}\r\n</script>`);
    }

    fs.writeFileSync(bundledOutput, injectedHTML, 'utf8');
    console.log(`✅ ${isProduction ? 'Production' : 'Development'} build complete!`);
  } catch (err) {
    console.error('❌ Error during build:', err);
  }
}

// --- Script execution logic ---
if (isDevelopment) {
  // Initial dev build
  copyDevJs();
  bundle();

  // Watch for changes in source files
  chokidar.watch([htmlInput, jsInput]).on('change', (changedPath) => {
    console.log(`\nFile ${changedPath} has been changed`);
    if (changedPath === jsInput) {
      copyDevJs(); // Copy JS file first if it changed
    }
    bundle(); // Re-bundle
  });

  console.log('👀 Watching for changes...');
}

if (isProduction) {
  bundle();
}
