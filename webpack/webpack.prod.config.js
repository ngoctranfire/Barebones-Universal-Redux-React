require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const strip = require('strip-loader');
const validate = require('webpack-validator');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicSettings = require('./webpack-isomorphic-tools-configuration');
const webpackPluginConfig = new WebpackIsomorphicToolsPlugin(webpackIsomorphicSettings);

const paths = {
  root: path.resolve(__dirname, '..'),
  output: path.resolve(__dirname, '../dist'),
  source: path.resolve(__dirname, '..', 'src'),
  nodeModules: path.resolve(__dirname, '..', 'node_modules')
};

// noinspection Eslint
module.exports = validate({
  devtool: 'source-map',
  context: paths.root,
  entry:  {
    'main': [
      './src/client/client.js'
    ]
  },
  output: {
    path: paths.output,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    publicPath: '/static/'
  },
  plugins: [
    new CleanPlugin([paths.output], { root: paths.root }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    webpackPluginConfig
  ],
  resolve: {
    modulesDirectories: [paths.source, paths.nodeModules],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: [strip.loader('debug'), 'babel'],
      },
      {
        test: webpackPluginConfig.regular_expression('images'),
        loader: 'url-loader?limit=10240'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },

    ]
  },
  progress: true,
});
