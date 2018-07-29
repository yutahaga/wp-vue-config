const path = require('path');
const chainWebpackModules = require('./chain-webpack');
const createCssOptions = require('./css');
const createDevServerOptions = require('./dev-server');
const vueConfigProperties = require('./common/vue-config-properties');

module.exports = function(options = {}) {
  const chainWebpackModuleExcludes = options.chainWebpackModuleExcludes || [];

  const vueCliConfig = {
    baseUrl: options.baseUrl || process.env.ASSETS_PUBLIC_PATH,

    outputDir:
      options.outputDir ||
      process.env.ASSETS_OUTPUT_DIR ||
      path.basename(process.env.ASSETS_PUBLIC_PATH),

    productionSourceMap: options.productionSourceMap || false,

    css: createCssOptions(process.env, options),

    devServer: createDevServerOptions(process.env, options),

    chainWebpack(config) {
      const chainWebpackModuleConfigs = options.chainWebpackModuleConfigs || {};

      Object.keys(chainWebpackModules).forEach(name => {
        if (chainWebpackModuleExcludes.indexOf(name) === -1) {
          chainWebpackModules[name](
            config,
            chainWebpackModuleConfigs[name] || {}
          );
        }
      });

      if (options.chainWebpack) {
        options.chainWebpack(config);
      }
    },
  };

  const definedProperties = Object.keys(vueCliConfig);
  vueConfigProperties
    .filter(
      prop =>
        definedProperties.indexOf(prop) === -1 && options[prop] !== undefined
    )
    .forEach(prop => {
      vueCliConfig[prop] = options[prop];
    });

  return vueCliConfig;
};
