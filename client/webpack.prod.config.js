const autoprefixer = require('autoprefixer');
const precss = require('precss');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};
