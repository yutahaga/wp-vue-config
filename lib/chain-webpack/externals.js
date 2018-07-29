const merge = require('webpack-merge');

// Externals
module.exports = (config, options) => {
  config.externals(
    merge(
      {
        jquery: 'jQuery',
        wordpress: 'wp',
      },
      options || {}
    )
  );
};
