class HtmlWorkerScriptPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlWorkerScriptPlugin', (compilation) => {
      // Hook into HtmlWebpackPlugin's emit stage
      const HtmlWebpackPlugin = compiler.options.plugins.find((plugin) => plugin.constructor.name === 'HtmlWebpackPlugin');

      if (HtmlWebpackPlugin) {
        HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit.tapAsync('HtmlWorkerScriptPlugin', (data, callback) => {
          console.log('HtmlWorkerScriptPlugin modifying HTML asset');
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
          } else {
            console.error('HtmlWorkerScriptPlugin: JavaScript asset not found.');
          }

          callback(null, data);
        });
      } else {
        console.error('HtmlWorkerScriptPlugin: HtmlWebpackPlugin not found.');
      }
    });
  }
}

module.exports = HtmlWorkerScriptPlugin;
