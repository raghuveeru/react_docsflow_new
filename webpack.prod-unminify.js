var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {  
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.unminified.js',
    publicPath: '/static/'
  },  
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: [node_modules_dir],
      include: path.join(__dirname, 'src')
    },
    { test: /\.css$/, loaders: ['style', 'css']}]
  },
  externals: {    
    "jquery": "jQuery",
  },
};
