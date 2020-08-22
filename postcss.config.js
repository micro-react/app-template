/**
 * author iWuzhi
 * date 2020-08-22 12:21:59
 */

module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-preset-env': options['postcss-preset-env']
      ? options['postcss-preset-env']
      : false,
    cssnano: env === 'production' ? options.cssnano : false,
  },
});