/**
 * author iWuzhi
 * date 2020-08-22 19:26:40
 */

const path = require('path');
const webpackMerge =  require('webpack-merge').default;

const base = require('./base');

module.exports = webpackMerge(base, {
  mode: 'production',
  entry: path.resolve(process.cwd(), 'src/index.tsx'),
  output: {
    library: 'your-app-name',
    libraryTarget: 'window',
  }
});