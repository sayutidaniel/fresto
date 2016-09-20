import express from 'express';
import path from 'path';
import morgan from 'morgan';
import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import ReactDOM from 'react-dom/server';
import WebpackDevServer from 'webpack-dev-server'; // eslint-disable-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import assetsProvider from './middleware/assetsProvider';
import api from './routes/api';
import configureStore from './configureStore';
import logger from './logger';
import routes from './routes/web';
import webpackConfig from '../webpack.client';
import Html from './templates/Html';

let server;
if (process.env.NODE_ENV === 'development') {
  server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: false,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
  });
  server.use(morgan('dev', { stream: logger.stream }));
} else {
  server = express();
  server.use(morgan('combined', { stream: logger.stream }));
  server.use('/assets', express.static(path.join(__dirname, 'assets')));
}

server.use(assetsProvider);
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
