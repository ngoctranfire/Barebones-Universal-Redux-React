/* global __DEVELOPMENT__ */
if (__DEVELOPMENT__) {
  module.exports = require('./client.dev.js');    // eslint-disable-line global-require
} else {
  module.exports = require('./client.prod.js');    // eslint-disable-line global-require
}
