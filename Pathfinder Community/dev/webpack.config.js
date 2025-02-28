const path = require('path');
const mode = process.env.NODE_ENV;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWorkerScriptPlugin = require('./HtmlWorkerScriptPlugin.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            presets: ['@babel/preset-env'], // Updated preset
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
      template: path.join(__dirname, 'src/index.html'),
      inlineSource: /\.js$/,
      minify: false, // handled by webpack^5 optimization. see below
      inject: false, // handled by HtmlWorkerScriptPlugin.js
    }),
    new HtmlInlineScriptPlugin(),
    new HtmlWorkerScriptPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: path.join(__dirname, 'src/pathfinder.css'), to: path.join(__dirname, mode === 'production' ? 'prod' : 'dist')},
        {from: path.join(__dirname, 'src/translation.json'), to: path.join(__dirname, mode === 'production' ? 'prod' : 'dist')},
      ],
    }),
  ],
  cache: {
    type: 'filesystem', // Recommended for production builds
  },
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
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
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
