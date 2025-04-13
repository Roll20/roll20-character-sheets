class HtmlWorkerScriptPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('HtmlWorkerScriptPlugin', (compilation) => {
      const HtmlWebpackPlugin = compiler.options.plugins.find((plugin) => plugin.constructor.name === 'HtmlWebpackPlugin');

      if (!HtmlWebpackPlugin) {
        console.error('HtmlWorkerScriptPlugin: HtmlWebpackPlugin not found.');
        return;
      }

      // Modify the HTML before emit
      HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit.tapAsync('HtmlWorkerScriptPlugin', (data, callback) => {
        const jsAsset = compilation.assets['index.js'];

        if (jsAsset) {
          const jsCode = jsAsset.source();
          // Append inline script to the end of the html
          data.html += `\n<script type="text/worker">${jsCode}</script>`;
          // Replace placeholders and clean up
          const currentDate = new Date().toUTCString();
          data.html = data.html.replace('$$CURRENTRELEASEDATE$$', currentDate);

          if (process.env.NODE_ENV === 'production') {
            data.html = data.html.replace(/^\s*<!--DEVELOPMENT CODE\. NOT READY FOR PRODUCTION YET-->\s*\r?\n?/gm, '');
          }
        }

        callback(null, data);
      });

      // force index.html to be re-emitted when JS changes
      compilation.hooks.afterProcessAssets.tap('HtmlWorkerScriptPlugin', () => {
        if (compilation.assets['index.html']) {
          const htmlSource = compilation.assets['index.html'].source();
          compilation.updateAsset('index.html', {
            source: () => htmlSource + '', // trigger change
            size: () => htmlSource.length,
          });
        }
      });
    });
  }
}

module.exports = HtmlWorkerScriptPlugin;
