import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withFormsy } from 'formsy-react';

class DefaultInput extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.state = { currentText: null }
  }
  changeValue(e) {
    this.setState({ currentText: e.target.value })
    this.props.setValue(e.target.value);
    this.props.onChange(e);
  }

  render() {
    return (
      <div>
        <TextField
          ref={this.props.name}
          label={this.props.title}
          name={this.props.name}
          onChange={this.changeValue}
          required={this.props.required}
          type={this.props.type}
          value={this.state.currentText ? this.state.currentText : this.props.value}
          defaultValue={this.props.defaultValue} />
      </div>
    );
  }
};

export default withFormsy(DefaultInput);
