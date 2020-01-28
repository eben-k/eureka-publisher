import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore, { history } from './store/configureStore';

const target = document.getElementById('publisherAppRoot');

export const store = configureStore(window.__INITIAL_STATE__);

const node = (
  <Root history={history} store={store} />
);

ReactDOM.render(node, target);
