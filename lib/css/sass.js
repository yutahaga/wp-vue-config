const installed = require('../common/installed');

module.exports = (env, _options) => {
  if (!installed.sass) {
    return {};
  }

  return {
    loaderOptions: {
      sass: {
        data: `${[
          `$env-node-env: ${env.NODE_ENV}`,
          `$env-public-path: '${env.VUE_APP_ASSETS_PUBLIC_PATH}'`,
        ].join(';')};`,
        importer: require('node-sass-glob-importer')(),
      },
    },
  };
};
