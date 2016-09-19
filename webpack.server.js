const config = require('config');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/server',
  ],
  externals: fs.readdirSync('node_modules')
    .filter(function(module) {
      return ['.bin'].indexOf(module) === -1;
    })
    .reduce(function(nodeModules, module) {
      nodeModules[module] = 'commonjs ' + module;
      return nodeModules;
    }, {}),
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'lib'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MONGO_URI': JSON.stringify(config.get('MONGODB_URI')),
      'process.env.NODE_ENV': JSON.stringify(env),
      'process.env.PORT': port,
    }),
  ],
  node: {
    __dirname: false,
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css/locals?module&localIdentName=[name]---[local]---[hash:base64:5]',
      },
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015&presets[]=react',
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?emitFile=false',
      },
    ],
  },
  target: 'node',
};
