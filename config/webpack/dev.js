/**
 * author iWuzhi
 * date 2020-08-22 19:21:29
 */

const path = require('path');
const webpackMerge =  require('webpack-merge').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const {
  webpackExternals,
  globalCSS,
} = require('global-config');

const env = require('../env')[process.env.NODE_ENV];

const externalScriptTags = webpackExternals.map(external => `<script src='${env.cdn + external.cdn}'></script>`);
const globalCSSTags = globalCSS.map(cssHref => `<link href='${env.cdn + cssHref}' rel="stylesheet" type="text/css"></link>`);
const headTags = externalScriptTags.concat(globalCSSTags).join('\n');

const base = require('./base');

module.exports = webpackMerge(base, {
  mode: 'development',
  entry: path.resolve(process.cwd(), 'src/dev.tsx'),
  devServer: {
    contentBase: './dist',
    proxy: {
      '/cdn': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/cdn': '',
        }
      },
      '/global-config/lib': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hei, Welcome to Remico',
      template: './public/index.html',
      inject: true,
      headTags
    }),
  ],
});