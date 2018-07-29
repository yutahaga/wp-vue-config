const StylelintPlugin = require('stylelint-webpack-plugin');
const merge = require('webpack-merge');

// Add Stylelint plugin
module.exports = (config, options) => {
  config.plugin('stylelint').use(StylelintPlugin, [
    merge(
      {
        files: ['src/**/*.css', 'src/**/*.scss', 'src/**/*.vue'],
      },
      options || {}
    ),
  ]);
};
