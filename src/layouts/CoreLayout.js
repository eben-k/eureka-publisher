import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CoreLayout extends Component {

  render() {
    return (
      <div>
        <span>
          Links: <Link to='/register'>Register</Link> |
          <Link to='/login'>Login</Link> |
          <Link to='/'>Home Page</Link>
        </span>
        <br />
        {this.props.children}
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element,
}

export default CoreLayout;
