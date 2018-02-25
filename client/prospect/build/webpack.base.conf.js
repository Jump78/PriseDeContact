'use strict'
const path = require('path')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const WebpackPwaManifest = require('webpack-pwa-manifest');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, '../src/sw.js'),
    }),
    new WebpackPwaManifest({
      "short_name": "pdc",
      "name": "prise de contact",
      "description": "Application de recolte d'information",
      "display": "standalone",
      "theme-color": "#01579b",
      "theme_color": "#01579b",
      "background_color": "#01579b",
      "start_url": "/#/evenements-ecole-multimedia",
      "icons": [
        {
          "src": path.resolve("src/assets/lecole-multimedia-logo.48x48.png"),
          "type": "image/png",
          "sizes": "48x48",
          destination: path.join('assets', 'icons')
        },
        {
          "src": path.resolve("src/assets/lecole-multimedia-logo.96x96.png"),
          "type": "image/png",
          "sizes": "96x96",
          destination: path.join('assets', 'icons')
        },
        {
          "src": path.resolve("src/assets/lecole-multimedia-logo.192x192.png"),
          "type": "image/png",
          "sizes": "192x192",
          destination: path.join('assets', 'icons')
        },
        {
          "src": path.resolve("src/assets/lecole-multimedia-logo.512x512.png"),
          "type": "image/png",
          "sizes": "512x512",
          destination: path.join('assets', 'icons')
        }
      ]
    })
  ],
}
