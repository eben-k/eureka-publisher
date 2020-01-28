import React, { Component } from 'react';
import Formsy from 'formsy-react';
import { Button, Paper } from '@material-ui/core';

import DefaultInput from './DefaultInput';

export class RegisterForm extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Formsy onValidSubmit={this.props.onSubmit}>
        <Paper zdepth={1} style={{ padding: 32 }}>
          <h3>Registration form</h3>
          <DefaultInput
            onChange={(event) => { }}
            name='username'
            title='Username'
            required />
          <DefaultInput
            onChange={(event) => { }}
            name='firstName'
            title='Firstname'
            required />
          <DefaultInput
            onChange={(event) => { }}
            name='lastName'
            title='Lastname'
            required />
          <DefaultInput
            onChange={(event) => { }}
            name='email'
            title='Email'
            required />
          <DefaultInput
            onChange={(event) => { }}
            type='password'
            name='password'
            title='Password'
            required />
          <div style={{ marginTop: 24 }}>
            <Button
              variant="contained"
              secondary='true'
              type="submit"
              style={{ margin: '0 auto', display: 'block', width: 150 }}
              label={'Register'}>
              Register
            </Button>
          </div>
        </Paper>
      </Formsy>
    )
  }
}
