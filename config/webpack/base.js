/**
 * author iWuzhi
 * date 2020-08-22 11:23:14
 */

const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

const globalConfig = require('global-config');

const externalsArr = globalConfig.webpackExternals.map(itemConfig => itemConfig.options);
const externals = Object.assign({}, ...externalsArr);

module.exports = {
  output: {
    path: path.resolve(process.cwd(), 'dist'),
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve('./src')
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            },
          }, 
          'postcss-loader', 
          'less-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  externals,
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
