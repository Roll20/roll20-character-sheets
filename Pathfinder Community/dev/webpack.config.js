const path = require('path');
const mode = process.env.NODE_ENV;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWorkerScriptPlugin = require('./HtmlWorkerScriptPlugin.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
class ForceFileCopyPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tap('ForceFileCopyPlugin', () => {
      if (mode === 'development') {
        this.options.files.forEach((file) => {
          try {
            const sourcePath = path.join(__dirname, file.from);
            const destPath = path.join(__dirname, 'dist', file.to);
            // Create '/dist' directory if it doesn't exist
            const fs = require('fs');
            if (!fs.existsSync(path.join(__dirname, 'dist'))) {
              fs.mkdirSync(path.join(__dirname, 'dist'));
            }
            fs.copyFileSync(sourcePath, destPath);
          } catch (error) {
            console.error(`Error copying ${file.from}: ${error.message}`);
          }
        });
      }
    });
  }
}
// build/prod completion logging
class BuildCompletionPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildCompletionPlugin', (stats) => {
      if (mode === 'development') {
        setTimeout(() => {
          console.log('\x1b[32m%s\x1b[0m', '✓ Build complete - watching for changes...\n');
        }, 400);
      }
      if (mode === 'production') {
        setTimeout(() => {
          console.log('\x1b[32m%s\x1b[0m', '✓ Build complete \n');
        }, 900);
      }
    });
  }
}

const webpackConfig = {
  entry: path.join(__dirname, 'src/index.js'),
  resolve: {
    modules: [path.resolve(__dirname, 'stubs'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HtmlWebpackPlugin({
      filename: mode === 'production' ? 'pathfinder_community.html' : 'index.html',
      template: path.join(__dirname, 'src/index.html'),
      inlineSource: /\.js$/,
      minify: false, // handled by webpack^5 optimization. see below
      inject: false, // handled by HtmlWorkerScriptPlugin.js
    }),
    new HtmlInlineScriptPlugin(),
    new HtmlWorkerScriptPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src/pathfinder.css'),
          to: path.join(__dirname, mode === 'production' ? 'prod/pathfinder_community.css' : 'dist/pathfinder.css'),
          force: true,
        },
        {
          from: path.join(__dirname, 'src/translation.json'),
          to: path.join(__dirname, mode === 'production' ? 'prod' : 'dist'),
          force: true,
        },
      ],
    }),
    new ForceFileCopyPlugin({
      files: [
        {from: 'src/pathfinder.css', to: 'pathfinder.css'},
        {from: 'src/translation.json', to: 'translation.json'},
      ],
    }),
    new BuildCompletionPlugin(),
  ],
  watch: mode === 'development' ? true : false,
  watchOptions: {
    ignored: ['**/node_modules', '**/dist', '**/prod'],
    aggregateTimeout: 300,
  },
  cache:
    mode === 'production'
      ? {
          type: 'filesystem',
        }
      : false, // Disable cache in development mode
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          compress: true,
          mangle: true,
          format: {
            comments: false,
          },
        },
      }),
      ...(mode === 'production'
        ? [
            new HtmlMinimizerPlugin({
              minimizerOptions: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: false, // keep false else it breaks the sheet
                useShortDoctype: true,
                removeEmptyAttributes: false, // keep false else it breaks the sheet
                keepClosingSlash: true,
                minifyJS: false,
                minifyCSS: true,
                minifyURLs: true,
              },
            }),
          ]
        : []),
    ],
  },
  output: {
    path: path.join(__dirname, mode === 'production' ? 'prod' : 'dist'),
    filename: 'index.js',
  },
};

module.exports = webpackConfig;
