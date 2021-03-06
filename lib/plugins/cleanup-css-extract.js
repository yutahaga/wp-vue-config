/* eslint-disable class-methods-use-this */

const minimatch = require('minimatch');

/**
 * エントリーに CSS を登録すると JS ファイルも一緒に生成されてしまうのでクリーンアップする
 *
 * @see https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
 */
class CleanupCssExtractPlugin {
  /**
   * Constructor
   *
   * @param {object} userOptions Plugin options
   * @returns {void}
   */
  constructor(userOptions) {
    this.options = Object.assign(
      {
        patterns: ['**/editor-style.*.js', '**/editor-style.*.js.map'],
      },
      userOptions
    );
  }

  /**
   * Apply side effect
   *
   * @see https://webpack.js.org/concepts/plugins/
   *
   * @param {object} compiler Instance of Webpack Compiler
   * @returns {void}
   */
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'CleanupCssExtractPlugin',
      (compilation, callback) => {
        Object.keys(compilation.assets)
          .filter(asset =>
            this.options.patterns.some(pattern => minimatch(asset, pattern))
          )
          .forEach(asset => {
            delete compilation.assets[asset];
          });

        callback();
      }
    );
  }
}

module.exports = CleanupCssExtractPlugin;

/* eslint-enable class-methods-use-this */
