import Express from 'express';
import qs from 'qs';


import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

import configureStore from '../common/store/configureStore';
import ContainerCounter from '../common/containers/ContainerCounter';
import { fetchCounter } from '../common/api/ApiCounter';

const app = new Express();

const appPort = Number(process.env.PORT) || 3000;

// const serverPort = appPort + 1;
// const host = process.env.HOST || 'localhost';
// const devServerUrl = 'http://' + host + ':' + serverPort;
// Proxy
// app.use('/static', proxy(url.parse(devServerUrl + "/static")));

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\x3c')}        
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

function handleRender(req, res) {
  fetchCounter(apiResult => {
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;
    const preloadedState = { counter };

    // Create a new Redux store instance
    const store = configureStore(preloadedState);

    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <ContainerCounter />
      </Provider>
    );

    // Grab the initial state from our Redux store
    const finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  });
}

// Api call
app.use(handleRender);

app.listen(appPort, (err) => {
  if (err) {
    throw err;
  } else {
    console.info('==> Visit site at localhost:%d', appPort);
  }
});
