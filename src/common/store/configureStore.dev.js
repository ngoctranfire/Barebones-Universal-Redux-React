import rootReducer, { default as nextRootReducer } from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import DevTools from '../containers/DevTools';

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  // const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  // return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(preloadedState) {
  const enhancers = compose(
    applyMiddleware(thunk),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
  );
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancers
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
