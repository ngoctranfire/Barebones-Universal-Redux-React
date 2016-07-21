require('babel-polyfill');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');
const WebpackDevServer = require('webpack-dev-server');

// Compiled Configs
const compiler = webpack(webpackConfig);

// App constants
const appPort = Number(process.env.PORT) || 3000;
const host = process.env.HOST || 'localhost';
// Server constants
const serverPort = appPort + 1;
const serverOptions = {
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  historyApiFallback: true,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};


const server = new WebpackDevServer(compiler, serverOptions);
// Run the two servers
server.listen(serverPort, host, (err, result) => {
  if (err) {
    throw err;
  }
  console.info(`WebpackDevServer running at serverPort=${serverPort}, result=${result}`);
});

