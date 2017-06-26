const {root} = require('./helpers');
var HtmlWebpackTimestampPlugin = require('html-webpack-timestamp-plugin');

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    path: root('dist')
  },
  module: {
    rules: [
      {test: /\.ts$/, loader: '@ngtools/webpack'},
      {test: /\.css$/, loader: 'raw-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackTimestampPlugin({})
  ]
};
