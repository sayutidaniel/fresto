import express from 'express';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import api from './routes/api';
import configureStore from './configureStore';
import logger from './logger';
import routes from './routes/web';
import Html from './templates/Html';

import webpack from 'webpack';
import config from '../webpack.client';
import WebpackDevServer from 'webpack-dev-server';

let server;
if (process.env.NODE_ENV === 'development') {
  server = new WebpackDevServer(webpack(config), {
    contentBase: false,
    publicPath: config.output.publicPath,
    serverSideRender: true,
  });
  server.use((req, res, next) => {
    const stats = res.locals.webpackStats.toJson();
    const assetsByChunkName = stats.assetsByChunkName;
    const assets = Object.keys(assetsByChunkName).reduce((assets, name) => assets.concat(assetsByChunkName[name]), []);
    res.locals.assets = assets.map(asset => stats.publicPath + asset);
    next();
  });
  server.use(morgan('dev', {stream: logger.stream}));
} else {
  server = express();
  server.use((req, res, next) => {
    fs.readFile(path.join(__dirname, 'webpack.assets.json'), (err, assets) => {
      res.locals.assets = JSON.parse(assets);
      next();
    });
  });
  server.use(morgan('combined', {stream: logger.stream}));
  server.use('/assets', express.static(path.join(__dirname, 'assets')));
}

server.use('/api/v1', api);
server.use((req, res) => {
  const assets = res.locals.assets;
  const styles = assets.filter(asset => asset.endsWith('.css'));
  const scripts = assets.filter(asset => asset.endsWith('.js'));
  const initialState = {};

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.send(ReactDOM.renderToStaticMarkup(
        <Html title="Fresto" styles={styles} scripts={scripts}>
          <Provider store={configureStore(initialState)}>
            <RouterContext {...renderProps} />
          </Provider>
        </Html>
      ));
    } else {
      res.status(404).send('Not found');
    }
  });
});

server.listen(process.env.PORT);
