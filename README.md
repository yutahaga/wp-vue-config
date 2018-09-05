# wp-vue-config

WordPress のための vue.config.js を簡単にセットアップできるユーティリティーです。

vue-cli に加えてこのユーティリティーを使うと、Vue.js を使わない場合にも簡単に WordPress テーマの開発環境を構築できます。

## Featured

* HMR 対応
* PHP ファイルの変更時に強制リロード
* アセットマニフェストの生成
* Stylelint
* gzip, brotli ファイルの生成
* 外部変数 jquery, wordpress の追加
* editor-style.css、customizer.js の生成
* サービスワーカーの生成
* 不要なプラグインなどの除去
* Sass / SCSS ファイル内での glob インポート
* アセットパスの変数を Sass / SCSS へ提供

## Getting Started

### Install

```sh
yarn add @yutahaga/wp-vue-config -D
```

### Usage

#### vue.config.js

```javascript
/* eslint-disable import/no-extraneous-dependencies */
const wpVueConfig = require('@yutahaga/wp-vue-config');

module.exports = wpVueConfig({
  // Options
});
```

#### .env

モジュール内部でいくつかの環境変数を使用しています。
`vue.config.js での設定 > 環境変数 > デフォルト設定` の順で優先されます。

[vue-cli の環境ファイルについての扱いはこちら](https://cli.vuejs.org/guide/mode-and-env.html)をご覧ください。

```sh
# WordPress サイトの URL (必須)
VUE_APP_SITE_URL="http://example.local"

# アセットファイルの提供元 URL (デフォルトは "http://localhost:8080")
# 主に開発環境で使います
VUE_APP_ASSETS_PROVIDER_URL="http://localhost:8080"

# アセットファイルの公開パス (必須)
VUE_APP_ASSETS_PUBLIC_PATH="/wp-content/themes/mytheme/assets/"

# Webpack Dev Server でプロキシする WordPress のルート
# 主に開発環境で使います。
# "/wp/" にすると http://localhost:8080/wp/ 以下に WordPress が配置されます。
VUE_APP_WP_PROXY_ROUTE="/wp/"

# Workbox で使うキャッシュ ID
VUE_APP_WORKBOX_CACHE_ID="mytheme"
```

### Options

vue.config.js のオプションで上書きできます。
また、下記の独自オプションで設定を簡単に切り替えることが出来ます。

```javascript
{
  /**
   * このモジュールで読み込む chainWebpack 設定を機能単位で除外できます
   * 機能一覧は lib/chain-webpack/index.js を参照ください
   *
   * type: Array<string>
   * default: []
   */
  chainWebpackModuleExcludes: [
    'editorStyle',
    'gzip',
  ],

  /**
   * 各機能モジュールへ渡すオプションです
   * 各機能モジュールのオプションについては lib/chain-webpack/ 以下のファイルをご覧ください
   *
   * type: {
   *   [key: string]: Object;
   * }
   * default: {}
   */
  chainWebpackModuleConfigs: {
    customizer: {
      fileName: './src/my-customizer.js',
    },
  },

  /**
   * Webpack Dev Server でプロキシする WordPress のルート
   * 環境変数 VUE_APP_WP_PROXY_ROUTE を上書きします
   *
   * default: /wp/
   */
  proxyRoute: '/home/'
}
```

### Sass / SCSS

このモジュールは Sass / SCSS の変数に一部の環境変数を割り当てます。
`$env-public-path` を使って画像の URL などを取得する関数を作ると便利です。

```scss
$env-node-env
$env-public-path
```

```scss
@function img-url($path) {
  $base-path: '#{$env-public-path}img/';

  @return url(#{$base-path}#{$path});
}

.my-logo {
  background: img-url('common/logo.svg') no-repeat;
}
```
