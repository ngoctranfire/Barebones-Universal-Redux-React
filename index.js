'use strict';
require('babel-core/register')({});

if (process.env.NODE_ENV == 'development') {
  require('./webpack/webpack-dev-server');
}

require('./src/server/index');