import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import article from './reducers/article';
import PublisherApp from './layouts/PublisherApp';

const store = createStore(article);

render(
  <Provider store={store}>
    <PublisherApp />
  </Provider>,
  document.getElementById('publisherAppRoot')
);
