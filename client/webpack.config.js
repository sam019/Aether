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
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)\??.*$/,
      loader: 'url?limit=8192',
      // url-loader是对file-loader的封装
      // 功能是将小图片转为base64格式
      // 其他的依然用file-loader处理
      // 写了url-load不用再写file-loader
    }],
  },
  postcss() {
    return [autoprefixer, precss];
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};
