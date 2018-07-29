// Remove unnecessary plugins
module.exports = (config, options) => {
  const targets = ['html', 'preload', 'prefetch'];

  (options.excludes
    ? targets.filter(name => options.excludes.indexOf(name) === -1)
    : targets
  ).forEach(name => {
    config.plugins.delete(name);
  });
};
