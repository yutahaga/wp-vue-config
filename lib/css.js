const merge = require('webpack-merge');
const css = require('./css/index');

module.exports = (env, options) =>
  merge(
    ...Object.keys(css).map(name => css[name](env, options)),
    options.css || {}
  );
