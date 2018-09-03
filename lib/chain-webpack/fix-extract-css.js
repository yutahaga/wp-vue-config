const mode = require('../common/mode');

// Add CleanupCSSExtract plugin on production mode
module.exports = (config, options) => {
  if (!mode.isProduction) {
    return;
  }

  const CleanupCssExtract =
    options.plugin || require('../plugins/cleanup-css-extract');

  config.plugin('fix-extract-css').use(CleanupCssExtract, [options || {}]);
};
