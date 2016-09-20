/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, match, Router } from 'react-router';
import configureStore from './configureStore';
import routes from './routes/web';

const initialState = {};
const store = configureStore(initialState);

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>, document.getElementById('app')
  );
});
