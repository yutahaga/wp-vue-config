const path = require('path');
const merge = require('webpack-merge');
const chainWebpackModules = require('./chain-webpack');
const createCssOptions = require('./css');
const createDevServerOptions = require('./dev-server');
const vueConfigProperties = require('./common/vue-config-properties');

const isObject = x => typeof x === 'object' && x !== null && !Array.isArray(x);

module.exports = function(options = {}) {
  const chainWebpackModuleExcludes = options.chainWebpackModuleExcludes || [];

  const vueCliConfig = {
    baseUrl: options.baseUrl || process.env.VUE_APP_ASSETS_PUBLIC_PATH,

    outputDir:
      options.outputDir ||
      process.env.VUE_APP_ASSETS_OUTPUT_DIR ||
      path.basename(process.env.VUE_APP_ASSETS_PUBLIC_PATH || 'assets'),

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
      vueCliConfig[prop] = isObject(options[prop])
        ? merge(vueCliConfig[prop] || {}, options[prop])
        : options[prop];
    });

  return vueCliConfig;
};
