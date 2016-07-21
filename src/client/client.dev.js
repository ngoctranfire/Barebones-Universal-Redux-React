import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import ContainerCounter from '../common/containers/ContainerCounter';
import DevTools from '../common/containers/DevTools';

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

const popup = window.open(null, 'Redux DevTools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
// Reload in case it already exists
popup.location.reload();

setTimeout(() => {
  popup.document.write('<div id="react-devtools-root"></div>');
  render(
    <DevTools store={store} />,
    popup.document.getElementById('react-devtools-root')
  );
}, 10);
