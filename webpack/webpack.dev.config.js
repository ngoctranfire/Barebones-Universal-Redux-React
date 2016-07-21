require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicSettings = require('./webpack-isomorphic-tools-configuration');
const validate = require('webpack-validator');

const webpackPluginConfig = new WebpackIsomorphicToolsPlugin(webpackIsomorphicSettings);

const paths = {
  root: path.resolve(__dirname, ".."),
  output: path.resolve(__dirname, '../dist'),
  source: path.resolve(__dirname, "..", "src"),
  eslint: path.resolve(__dirname, "..", '.eslintrc'),
  nodeModules: path.resolve(__dirname, "..", 'node_modules')
};
const host = (process.env.HOST || 'localhost');
const serverPort = Number(process.env.PORT) + 1;

module.exports = validate({
  devtool: 'cheap-module-eval-source-map',
  context: paths.root,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://' + host + ':' + serverPort,
    'webpack/hot/only-dev-server',
    './src/client/client.js',
  ],
  output: {
    path: paths.output,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),
    webpackPluginConfig.development()
  ],
  resolve: {
      modulesDirectories: [
        paths.source,
        paths.nodeModules
      ],
      extensions: ['', '.json', '.js', '.jsx']
  },
  eslint: {
    configFile: paths.eslint
  },
  module: {
    preLoaders: [{
      test: /\.js|\.jsx$/,
      loaders: ['eslint-loader'],
      exclude: [paths.nodeModules]
    }],
    loaders: [{
      test: /\.js|\.jsx$/,
      loaders: ['react-hot-loader/webpack','babel'],
      include: paths.source
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: paths.source
    }
    ]
  }
});
