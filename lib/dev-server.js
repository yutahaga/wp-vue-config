const open = require('opn');
const merge = require('webpack-merge');

module.exports = (env, options) => {
  const proxyRoute = (
    options.proxyRoute ||
    env.VUE_APP_WP_PROXY_ROUTE ||
    '/wp/'
  ).replace(/([^/])\$/, '$1/');

  return merge(
    {
      public: (
        env.VUE_APP_ASSETS_PROVIDER_URL || 'http://localhost:8080'
      ).replace(/\/$/, ''),
      proxy: {
        [proxyRoute]: {
          target: env.VUE_APP_SITE_URL,
          pathRewrite: { [`^${proxyRoute}`]: '/' },
        },
      },
      before(_app, server) {
        server._watch('**/*.php', {
          ignored: /(^|[/\\])(node_modules|src)/,
        });
      },
      after(_app, server) {
        open(`${server.publicHost}${proxyRoute}`);
      },
    },
    options.devServer || {}
  );
};
