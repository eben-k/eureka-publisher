import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';

import routes from '../routes';
import configureStore, { history } from '../store/configureStore';

const store = configureStore(window.__INITIAL_STATE__)

export default class Root extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <ConnectedRouter history={this.props.history}>
            <Route>
              {routes}
            </Route>
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

