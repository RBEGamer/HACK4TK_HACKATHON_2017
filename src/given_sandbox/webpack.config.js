let ngtools = require('@ngtools/webpack'),
  webpackMerge = require('webpack-merge'),
  commonPartial = require('./webpack/webpack.common'),
  clientPartial = require('./webpack/webpack.client'),
  serverPartial = require('./webpack/webpack.server'),
  prodPartial = require('./webpack/webpack.prod'),
  getAotPlugin = require('./webpack/webpack.aot').getAotPlugin;

module.exports = function (options, webpackOptions) {
  options = options || {};

  let serverConfig = webpackMerge({}, commonPartial, serverPartial, {
    devtool: (options.devtool ? options.devtool : ''),
    entry: options.aot ? './src/server.aot.ts' : serverPartial.entry,
    plugins: [
      getAotPlugin('server', options.aot)
    ]
  });
  let clientConfig = webpackMerge({}, commonPartial, clientPartial, {
    devtool: (options.devtool ? options.devtool : ''),
    plugins: [
      getAotPlugin('client', options.aot)
    ]
  });
  if (webpackOptions.p) {
    clientConfig = webpackMerge({}, clientConfig, prodPartial);
  }
  let configs = [];
  if (!options.aot) {
    console.log('');
    console.log('');
    console.log('Running JiT-Compilation. (This takes a few moments.)');
    console.log('');
    console.log('While developing, you should use npm watch! Incremental builds are much faster.');
    console.log('');
    configs.push(clientConfig, serverConfig);
  }
  else if (options.client) {
    console.log('AOT Client config')
    configs.push(clientConfig);
  }

  else if (options.server) {
    console.log('AOT Server config')
    configs.push(serverConfig);
  }
  //console.log(configs);
  return configs;
};

let webpack = require('webpack');
