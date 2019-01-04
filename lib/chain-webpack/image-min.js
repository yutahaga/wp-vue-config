const ImageminPlugin = require('imagemin-webpack');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngQuant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');
const mode = require('../common/mode');

module.exports = (config, options) => {
  if (!mode.isProduction) {
    return;
  }

  const plugins = options.plugins || [
    imageminGifsicle({
      interlaced: true,
    }),
    imageminMozjpeg({
      progressive: true,
      quality: options.quality || 90,
    }),
    imageminPngQuant({
      quality: options.quality || 90,
    }),
    imageminSvgo({
      floatPrecision: options.precision || 1,
    }),
  ];

  config
    .plugin('imagemin')
    .use(ImageminPlugin, [
      {
        cache: options.cache || true,
        name: options.name || '[path][hash].[ext]',
        imageminOptions: { plugins },
      },
    ])
    .before('brotli');
};
