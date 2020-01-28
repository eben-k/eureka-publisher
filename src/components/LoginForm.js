import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Button, Paper } from '@material-ui/core';

import DefaultInput from './DefaultInput';

export class LoginForm extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Formsy onValidSubmit={this.props.onSubmit}>
        <Paper zdepth={1} style={{ padding: 32 }}>
          <h3>Log in</h3>
          <DefaultInput
            onChange={(event) => { }}
            name='username'
            title='Username (admin)'
            required />
          <DefaultInput
            onChange={(event) => { }}
            type='password'
            name='password'
            title='Password (123456)'
            required />
          <div style={{ marginTop: 24 }}>
            <Button
              variant="contained"
              secondary="true"
              type="submit"
              style={{ margin: '0 auto', display: 'block', width: 150 }}
              label={'Log in'}>
              Log in
              </Button>
          </div>
        </Paper>
      </Formsy>
    )
  }
}
