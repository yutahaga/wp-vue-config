const installed = require('../common/installed');

// WordPress Customizer
module.exports = (config, options) => {
  const extension = installed.typescript ? 'ts' : 'js';

  config
    .entry('customizer')
    .add(options.fileName || `./src/customizer.${extension}`);
};
