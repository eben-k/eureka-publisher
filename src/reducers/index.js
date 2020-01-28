import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import article from './article';

export default (history) => combineReducers({
  router: connectRouter(history),
  article
})
