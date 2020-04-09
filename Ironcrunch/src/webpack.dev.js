const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var path = require('path');

module.exports = {
  entry: {
    index: './html/ironcrunch.html',
    styles: './src/ironcrunch.styl'
  },
  mode: 'development',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    },
    port: 8080
  },
  output: {
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({filename: "ironcrunch.css"}),
    new HtmlWebpackPlugin({
      template: './html/ironcrunch.html',
      minify: false,
      inject: true,
      chunks: ['ironcrunch'],
      filename: 'ironcrunch.html'
    })
  ]
};