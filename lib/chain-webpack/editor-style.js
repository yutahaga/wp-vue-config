const installed = require('../common/installed');

// WordPress Editor Style
module.exports = (config, options) => {
  const extension = installed.sass ? 'scss' : 'css';

  config
    .entry('editor-style')
    .add(options.fileName || `./src/assets/styles/editor-style.${extension}`);
};
