const fs = require('fs');
const path = require('path');
const {minify} = require('html-minifier-terser');
const chokidar = require('chokidar');
const argv = require('minimist')(process.argv.slice(2));

const htmlInput = 'index.html';
const jsInput = 'index.js';
const cssInput = '1ESheet.css';

const isProduction = argv.prod;
const isDevelopment = argv.dev;

// Output paths
const devDir = 'dev';
const prodDir = 'prod';
const devJsOutput = `${devDir}/index.js`;
const prodJsInput = `${prodDir}/index.js`;

const devHtmlOutput = `${devDir}/1ESheet.html`;
const prodHtmlOutput = `${prodDir}/1ESheet.html`;

const devCssOutput = `${devDir}/1ESheet.css`;
const prodCssOutput = `${prodDir}/1ESheet.css`;

// Ensure directory exists
function ensureDir(folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
}

// ---- Copy JS for development ----
function copyDevJs() {
  try {
    ensureDir(devDir);
    fs.copyFileSync(jsInput, devJsOutput);
    console.log(`Copied ${jsInput} → ${devJsOutput}`);
  } catch (err) {
    console.error(`Error copying ${jsInput}:`, err);
  }
}

// ---- Copy CSS ----
function copyCss(outputPath) {
  try {
    fs.copyFileSync(cssInput, outputPath);
    console.log(`Copied ${cssInput} → ${outputPath}`);
  } catch (err) {
    console.error(`Error copying CSS:`, err);
  }
}

// ---- Bundling function ----
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

    // output to dev/ or prod/
    const outputPath = isProduction ? prodHtmlOutput : devHtmlOutput;
    fs.writeFileSync(outputPath, injectedHTML, 'utf8');

    console.log(`✅ ${isProduction ? 'Production' : 'Development'} build → ${outputPath}`);
  } catch (err) {
    console.error('❌ Error during build:', err);
  }
}

// ---- DEV MODE ----
if (isDevelopment) {
  ensureDir(devDir);

  // Initial actions
  copyDevJs();
  copyCss(devCssOutput);
  bundle();

  console.log('👀 Watching for changes...');

  chokidar.watch([htmlInput, jsInput, cssInput]).on('change', (changedPath) => {
    console.log(`\nFile changed: ${changedPath}`);

    if (changedPath === jsInput) {
      copyDevJs();
    }

    if (changedPath === cssInput) {
      copyCss(devCssOutput);
    }

    bundle();
  });
}

// ---- PROD MODE ----
if (isProduction) {
  ensureDir(prodDir);

  copyCss(prodCssOutput);
  bundle();
}
