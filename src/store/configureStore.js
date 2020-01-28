import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';

import rootReducer from '../reducers';

export const history = createBrowserHistory();

export default function configureStore(initialState, debug = false) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);
  createStoreWithMiddleware = compose(middleware);

  const store = createStoreWithMiddleware(createStore)(rootReducer(history), initialState);
  return store;
}
