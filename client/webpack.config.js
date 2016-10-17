const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  entry: ['webpack/hot/only-dev-server', './src/index.jsx'],
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }, {
      test: /\.(css|scss)$/,
      loader: 'style!css?modules!postcss!sass',
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192',
    }],
  },
  postcss() {
    return [autoprefixer, precss];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
