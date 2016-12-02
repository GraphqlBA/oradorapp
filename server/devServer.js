const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../webpack.config');

const compiler = webpack(config);

const app = express();
module.exports = app;

app.use(require('webpack-dev-middleware')(compiler, Object.assign(
  {},
  config.devServer,
  { publicPath: config.output.publicPath }
)));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});
