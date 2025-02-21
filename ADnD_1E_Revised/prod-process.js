const fs = require('fs'); // file system
const {minify} = require('html-minifier'); // Import html-minifier

const htmlInput = 'src/index.html';
const jsOutput = 'prod/index.js';
const bundledOutput = '1ESheet.html';

try {
  const html = fs.readFileSync(htmlInput, 'utf8');
  const js = fs.readFileSync(jsOutput, 'utf8');

  // Minify HTML
  const minifiedHTML = minify(html, {
    collapseWhitespace: true,
    minifyJS: true,
  });

  // inject JS into the script tag.
  const injectedHTML = minifiedHTML.replace(/<script type="text\/worker"><\/script>/, `\r<script type="text/worker">${js}</script>`);

  fs.writeFileSync(bundledOutput, injectedHTML, 'utf8');
  console.log('Prod complete!');
} catch (err) {
  console.error('Error during prod:', err);
}
