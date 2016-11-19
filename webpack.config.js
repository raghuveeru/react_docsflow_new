var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    { test: /\.css$/, loaders: ['style', 'css']},
    {test: /\.(woff2|woff|ttf|eot|svg)(\?.*$|$)/,
       loader: 'file-loader?name=fonts/[name].[ext]'},
       {test: /main.css$print.css$/,
          loader: 'file-loader?name=styles/[name].[ext]'}
  ]
  }
};
