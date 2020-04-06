const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    index: './html/Ironsworn.html',
    styles: './css/Ironsworn.css'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/Ironsworn.html',
      minify: true,
      inject: true,
      chunks: ['Ironsworn'],
      filename: 'Ironsworn.html'
    })
  ]
};