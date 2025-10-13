class HtmlWorkerScriptPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('HtmlWorkerScriptPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'HtmlWorkerScriptPlugin',
          stage: compilation.constructor.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        (assets) => {
          const htmlAsset = assets['index.html'];
          const jsAsset = assets['index.js'];

          if (!htmlAsset || !jsAsset) {
            console.warn('HtmlWorkerScriptPlugin: Required assets missing (index.html or index.js)');
            return;
          }

          const htmlSource = htmlAsset.source().toString();
          const jsSource = jsAsset.source().toString();

          // Inject the script at the end of the html
          let updatedHtml = htmlSource + `\n<script type="text/worker">${jsSource}</script>`;

          // Replace placeholder
          const currentDate = new Date().toUTCString();
          updatedHtml = updatedHtml.replace('$$CURRENTRELEASEDATE$$', currentDate);

          // Strip dev warning in prod
          if (process.env.NODE_ENV === 'production') {
            updatedHtml = updatedHtml.replace(/^\s*<!--DEVELOPMENT CODE\. NOT READY FOR PRODUCTION YET-->\s*\r?\n?/gm, '');
          }

          // Replace index.html asset with modified version
          compilation.updateAsset('index.html', {
            source: () => updatedHtml,
            size: () => Buffer.byteLength(updatedHtml, 'utf8'),
          });

          console.log('\x1b[33m%s\x1b[0m', '✓ HtmlWorkerScriptPlugin: Worker script injected');
        },
      );
    });
  }
}

module.exports = HtmlWorkerScriptPlugin;
