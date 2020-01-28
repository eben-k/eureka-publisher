import React, { Component } from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Snackbar } from '@material-ui/core';

import { LoginForm } from '../components/LoginForm';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({});

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {
      error: null
    };
  }

  async login(credentials) {
    console.info('credentials', credentials);
    await falcorModel.call(['login'], [credentials]).then((result) => result);
    const tokenRes = await falcorModel.getValue('login.token');
    console.info('tokenRes', tokenRes);
    if (tokenRes === 'INVALID') {
      const errorRes = await falcorModel.getValue('login.error');
      this.setState({ error: errorRes });
      return;
    }
    if (tokenRes) {
      const username = await falcorModel.getValue('login.username');
      const role = await falcorModel.getValue('login.role');
      localStorage.setItem('token', tokenRes);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      this.props.history.push('/dashboard');
    }
    return;
  }
  render() {
    return (
      <div>
        <h1>Login</h1>
        <div style={{ maxWidth: 450, margin: '0 auto' }}>
          <LoginForm
            onSubmit={this.login} />
        </div>
        <Snackbar
          autoHideDuration={4000}
          open={!!this.state.error}
          message={this.state.error || ''}
          onRequestClose={() => null} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
