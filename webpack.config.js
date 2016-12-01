/* eslint-disable */
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');


var rootPath = path.join(__dirname, './client');
var env = process.env.NODE_ENV || 'development';


module.exports = {
  devtool: env === 'development' ? 'eval-source-map' : 'source-map',
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    noInfo: true
  },
  stats: {
    colors: true
  },
  entry: {
    app: [
      env === 'development' && 'react-hot-loader/patch',
      env === 'development' && 'webpack-hot-middleware/client',
      './client/index'
    ].filter(Boolean)
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [rootPath],
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /.*\.scss$/, loader: 'style!css?modules!postcss!sass' },
      { test: /.*\.css$/, loader: 'style!css?modules!postcss' },
      { test: /\.png/, loader: "file-loader?mimetype=image/png" },
      { test: /\.jpg/, loader: "file" },
      { test: /\.gif/, loader: "file" },
      { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions'] })];
  },
  resolve: {
    root: rootPath,
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
  },
  plugins: [
    // Prevent showing lint errors
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    env === 'development' && new webpack.HotModuleReplacementPlugin(),
    env !== 'development' && new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template: "./client/assets/index.template.html",
      environment: env
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify(env)
      }
    }),
  ].filter(Boolean)
};


/* eslint-enable */
