/* global __DEVELOPMENT__ */
if (__DEVELOPMENT__) {
  module.exports = require('./configureStore.dev');   // eslint-disable-line global-require
} else {
  module.exports = require('./configureStore.prod');  // eslint-disable-line global-require
}
