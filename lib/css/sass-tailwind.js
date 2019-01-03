const findConfig = require('find-config');
const merge = require('webpack-merge');
const installed = require('../common/installed');

/**
 * Compose functions
 *
 * @param  {...function} fns - functions
 * @returns {function} fn
 */
function compose(...fns) {
  return fns.reduce((f, g) => (...xs) => {
    const r = g(...xs);
    return Array.isArray(r) ? f(...r) : f(r);
  });
}

/**
 * Create Sass Functions Object
 *
 * @param {object} tailwindConfig - configuration of tailwindcss
 * @returns {object} sass functions object
 */
function createSassFunctionsObject(tailwindConfig) {
  const partnizeRegexp = /[a-zA-Z]+|[0-9.]+/g;
  const cssUnits = [
    'rem',
    'em',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'ex',
    '%',
    'px',
    'cm',
    'mm',
    'in',
    'pt',
    'pc',
    'ch',
    'deg',
  ];

  return {
    'config($keys)'(keys) {
      /* eslint-disable-next-line @mysticatea/node/no-missing-require */
      const sass = require('node-sass');
      const sassUtils = require('node-sass-utils')(sass);
      const rgba = require('color-rgba');

      /**
       * 文字列を数値・単位付き数値オブジェクトへ変換
       *
       * @param {any} result - プロパティ値
       * @returns {any} Sass 用に変換されたプロパティ値
       */
      function convertStringToSassDimension(result) {
        if (typeof result !== 'string') {
          return result;
        }

        const parts = result.match(partnizeRegexp);
        const value = parts[0];
        const unit = parts[parts.length - 1];

        if (cssUnits.indexOf(unit) !== -1) {
          return new sassUtils.SassDimension(parseFloat(value), unit);
        }

        return result;
      }

      /**
       * 文字列を色オブジェクトへ変換
       *
       * @param {any} result - プロパティ値
       * @returns {any} Sass 用に変換されたプロパティ値
       */
      function convertStringToSassColor(result) {
        if (typeof result !== 'string') {
          return result;
        }

        const color = rgba(result);
        if (Array.isArray(color)) {
          if (color.length < 4) {
            color.push(0);
          }
          /* eslint-disable-next-line new-cap */
          return sass.types.Color(...color);
        }

        return result;
      }

      /**
       * 文字列を Sass プロパティオブジェクトへ変換
       *
       * @param {any} result - プロパティ値
       * @returns {any} Sass 用に変換されたプロパティ値
       */
      function toSassValue(result) {
        return compose(
          convertStringToSassColor,
          convertStringToSassDimension
        )(result);
      }

      let result = tailwindConfig;
      keys
        .getValue()
        .split('.')
        .forEach(name => {
          result = result[name];
          if (typeof result === 'string') {
            result = toSassValue(result);
          } else if (typeof result === 'object') {
            Object.keys(result).forEach(key => {
              const value = result[key];
              result[key] = toSassValue(value);
            });
          }
        });
      result = sassUtils.castToSass(result);

      return result;
    },
  };
}

/**
 * TailwindCSS の設定を取得
 *
 * @returns {object} TailwindCSS の設定
 */
function getConfig() {
  const config1 =
    findConfig.require('tailwind.config.js', { home: false }) || {};
  const config2 = findConfig.require('tailwind.js', { home: false }) || {};

  return merge(config1, config2);
}

module.exports = (_env, options) => {
  if (!installed.sass || !installed.tailwindcss) {
    return options.css || {};
  }

  return {
    loaderOptions: {
      sass: {
        functions: createSassFunctionsObject(getConfig()),
      },
    },
  };
};
