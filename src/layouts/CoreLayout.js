import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import theme from './theme';

class CoreLayout extends Component {

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <span>
            Links: <Link to='/register'>Register</Link> |
          <Link to='/login'>Login</Link> |
          <Link to='/'>Home Page</Link>
          </span>
          <br />
          {this.props.children}
        </ThemeProvider>
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element,
}

export default CoreLayout;
