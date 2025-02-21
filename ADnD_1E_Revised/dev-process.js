const fs = require('fs');
const chokidar = require('chokidar'); // watches for file changes

const htmlInput = 'src/index.html';
const jsOutput = 'dev/index.js';
const bundledOutput = '1ESheet.html';

function bundle() {
  try {
    const html = fs.readFileSync(htmlInput, 'utf8');
    const js = fs.readFileSync(jsOutput, 'utf8');
    const injectedHTML = html.replace(/<script type="text\/worker"><\/script>/, `\r<script type="text/worker">${js}</script>`);

    fs.writeFileSync(bundledOutput, injectedHTML, 'utf8');
    console.log('Build complete!');
  } catch (err) {
    console.error('Error during build:', err);
  }
}

// Initial build
bundle();

// Watch for changes and re-bundle
chokidar.watch([htmlInput, jsOutput]).on('change', (path) => {
  console.log(`File ${path} has been changed`);
  bundle();
});

console.log('Watching for changes...');
