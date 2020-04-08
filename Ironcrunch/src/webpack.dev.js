const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var path = require('path');

module.exports = {
  entry: {
    index: './html/Ironcrunch.html',
    styles: './src/Ironcrunch.styl'
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
    new MiniCssExtractPlugin({filename: "Ironcrunch.css"}),
    new HtmlWebpackPlugin({
      template: './html/Ironcrunch.html',
      minify: true,
      inject: true,
      chunks: ['Ironcrunch'],
      filename: 'Ironcrunch.html'
    })
  ]
};