const mode = require('../common/mode');

module.exports = (_env, options) => ({
  sourceMap: options.productionSourceMap ? true : !mode.isProduction,
});
