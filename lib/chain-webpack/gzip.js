const merge = require('webpack-merge');
const mode = require('../common/mode');

// Gzip compression
module.exports = (config, options) => {
  if (!mode.isProduction) {
    return;
  }

  const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');

  const generator =
    options.generator && typeof options.generator === 'function'
      ? options.generator
      : () => ({});

  const gzipBaseOptions = merge(
    {
      asset: '[path].%extension%[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    },
    options.generator ? {} : options || {}
  );

  [
    { name: 'brotli', extension: 'br' },
    { name: 'gzip', extension: 'gz' },
  ].forEach(algo => {
    config.plugin(algo.name).use(BrotliGzipPlugin, [
      merge(
        gzipBaseOptions,
        {
          asset: gzipBaseOptions.asset.replace('%extension%', algo.extension),
          algorithm: algo.name,
        },
        generator(algo) || {}
      ),
    ]);
  });
};
