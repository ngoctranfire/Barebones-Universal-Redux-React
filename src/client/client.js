import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import ContainerCounter from '../common/containers/ContainerCounter';

/* eslint no-underscore-dangle: ["error", { "allow": ["__PRELOADED_STATE__"] }] */
const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('root');

render(
  <Provider store={store}>
    <ContainerCounter />
  </Provider>,
  rootElement
);
