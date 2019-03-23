const webpack = require('webpack');
const merge = require('webpack-merge');

// Add Stylelint plugin
module.exports = (config, options) => {
  config.plugin('provide').use(webpack.ProvidePlugin, [
    merge(
      {
        $: 'jquery',
      },
      options || {}
    ),
  ]);
};
