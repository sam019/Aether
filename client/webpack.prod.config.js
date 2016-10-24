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
    }, {
      test: /\.(css|scss)$/,
      loader: 'style!css?modules!postcss!sass',
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)\??.*$/,
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  node: {
    fs: 'empty',
  },
};
