const merge = require('webpack-merge');
const installed = require('../common/installed');

module.exports = (env, options) => {
  if (!installed.sass) {
    return options.css || {};
  }

  return merge(
    {
      loaderOptions: {
        sass: {
          data: `${[
            `$env-node-env: ${env.NODE_ENV}`,
            `$env-public-path: '${env.VUE_APP_ASSETS_PUBLIC_PATH}'`,
          ].join(';')};`,
          importer: require('node-sass-glob-importer')(),
        },
      },
    },
    options.css || {}
  );
};
