require('babel-core/register')({});
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  // noinspection Eslint
  require('./webpack/webpack-dev-server');
}
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
// noinspection Eslint
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/webpack-isomorphic-tools-configuration'))
  .development(__DEVELOPMENT__)
  .server(path.resolve(__dirname), () => {
    if (__DEVELOPMENT__) {
      // noinspection Eslint
      require('./src/server/server.dev');
    } else {
      // noinspection Eslint
      require('./src/server/server.prod');
    }
  });
