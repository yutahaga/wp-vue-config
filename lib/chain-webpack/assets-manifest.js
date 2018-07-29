const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

const excludePattern = /^editor-style\.js(\.map)?$/;
const defaultFileName = 'index.json';

// Add webpack-manifest-plugin
module.exports = (config, options) => {
  config.plugin('manifest').use(ManifestPlugin, [
    merge(
      {
        fileName: defaultFileName,
        writeToFileEmit: true,
        filter({ name }) {
          return !excludePattern.test(name);
        },
      },
      options || {}
    ),
  ]);
};
