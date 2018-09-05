const path = require('path');
const isServe = require('../common/is-serve');

// Inject the code to WordPress front-end on webpack-dev-server
module.exports = (config, options) => {
  if (!isServe) {
    return;
  }

  const codePath = options.path || path.resolve(__dirname, '../wp-inject.js');

  config.entry('app').add(codePath);
};
