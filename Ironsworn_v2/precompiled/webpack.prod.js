const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var path = require('path');

module.exports = {

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './html/Ironsworn.html',
    styles: './html/Ironsworn.css'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist')
  },
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new OptimizeCSSAssetsPlugin({}),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({filename: "Ironsworn.css"}),
    new HtmlWebpackPlugin({
      template: './html/Ironsworn.html',
      minify: true,
      inject: true,
      chunks: ['Ironsworn'],
      filename: 'Ironsworn.html'
    })
  ]
};