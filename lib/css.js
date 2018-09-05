const merge = require('webpack-merge');
const mode = require('./common/mode');
const installed = require('./common/installed');

module.exports = (env, options) => {
  const loaderOptions = {};

  if (installed.sass) {
    loaderOptions.sass = {
      data: `${[
        `$env-node-env: ${env.NODE_ENV}`,
        `$env-public-path: '${env.VUE_APP_ASSETS_PUBLIC_PATH}'`,
      ].join(';')};`,
      importer: require('node-sass-glob-importer')(),
    };
  }

  return merge(
    {
      sourceMap: options.productionSourceMap ? true : !mode.isProduction,
      loaderOptions,
    },
    options.css || {}
  );
};
