import React, { Component } from 'react';
import Falcor from 'falcor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import falcorModel from '../falcorModel';
import { LoginForm } from '../components/LoginForm';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({});

class DashboardView extends Component {

  render() {
    return (
      <div>
        <h1>Dashboard - loggedin!</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
