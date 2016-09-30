const config = require('config');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

module.exports = {
  devtool: 'source-map',
  entry: {
    app: (env === 'development' ? [
      `webpack-dev-server/client?http://localhost:${port}`,
    ] : []).concat([
      './src/client',
    ]),
    common: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
    ],
  },
  output: {
    chunkFilename: '[name]-[chunkHash].js',
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'lib/assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(config.get('API_BASE_URL')),
      'process.env.GOOGLE_MAP_API_KEY': JSON.stringify(config.get('GOOGLE_MAP_API_KEY')),
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /\.\/(en|id)$/, false),
  ].concat(env === 'development' ? [] : [
    function() {
      this.plugin('done', (webpackStats) => {
        const stats = webpackStats.toJson();
        const assetsByChunkName = stats.assetsByChunkName;
        const assets = Object.keys(assetsByChunkName).reduce((assets, name) => assets.concat(assetsByChunkName[name]), []);
        fs.writeFileSync(path.join(__dirname, 'lib/webpack.assets.json'), JSON.stringify(assets.map(asset => stats.publicPath + asset)));
      });
    },
    new ExtractTextPlugin('[name]-[hash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]),
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: env === 'development' ? 'style!css?modules&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]!postcss': ExtractTextPlugin.extract('style', 'css?minimize&modules!postcss'),
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: `file?name=[path][name]-[hash].[ext]&context=${path.join(__dirname, '../src')}`,
      },
    ],
  },
  postcss: [
    require('postcss-cssnext')(),
  ],
  recordsPath: path.join(__dirname, 'lib/webpack.records.json'),
  target: 'web'
};
