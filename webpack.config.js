/**
 * author iWuzhi
 * date 2020-08-22 11:23:14
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge').default;
const globalConfig = require('global-config');

const externalsArr = globalConfig.webpackExternals.map(itemConfig => itemConfig.options);
const externals = Object.assign({}, ...externalsArr);

module.exports = webpackMerge({
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve('./src')
      },
      {

        test: /\.less$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2
          },
        }, 'postcss-loader', 'less-loader'],
      },
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
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
      title: 'Output Management',
      template: './public/index.html',
      inject: false,
    }),
  ],
}, {
  externals
});
