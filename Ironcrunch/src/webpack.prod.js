const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

module.exports = {
  entry: {
    index: './html/Ironcrunch.html',
    styles: './src/Ironcrunch.styl'
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