const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

module.exports = {
  entry: {
    index: './html/ironcrunch.html',
    styles: './src/ironcrunch.styl'
  },
  mode: 'production',
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