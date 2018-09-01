const merge = require('webpack-merge');
const mode = require('../common/mode');

// Add Service Worker Plugin
module.exports = (config, options) => {
  if (!mode.isProduction) {
    return;
  }

  const { GenerateSW } = require('workbox-webpack-plugin');

  config.plugin('sw').use(GenerateSW, [
    merge(
      {
        cacheId: process.env.WORKBOX_CACHE_ID,
        swDest: 'service-worker.js',
        skipWaiting: true,
        clientsClaim: false,
        runtimeCaching: [
          {
            urlPattern: /(?:\/|\/\?.*)$/,
            handler: 'networkFirst',
            options: {
              cacheName: 'page-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: /\.(?:json|js|css)/,
            handler: 'networkFirst',
            options: {
              cacheName: 'page-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|woff2?|ttf|eot|swf|mp4|mp3)/,
            handler: 'cacheFirst',
            options: {
              cacheName: 'asset-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 14,
              },
            },
          },
        ],
      },
      options || {}
    ),
  ]);
};
