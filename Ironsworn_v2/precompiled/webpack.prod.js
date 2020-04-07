const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

module.exports = {
  entry: {
    index: './html/Ironsworn.html',
    styles: './src/Ironsworn.styl'
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