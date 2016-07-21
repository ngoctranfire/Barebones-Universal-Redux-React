import rootReducer from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
  const enhancers = compose(applyMiddleware(thunk));
  const store = createStore(
    rootReducer,
    preloadedState,
    enhancers
  );

  return store;
}
