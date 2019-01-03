const merge = require('webpack-merge');
const mode = require('../common/mode');

module.exports = (_env, options) =>
  merge(
    {
      sourceMap: options.productionSourceMap ? true : !mode.isProduction,
    },
    options.css || {}
  );
