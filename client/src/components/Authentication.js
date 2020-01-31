import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Authentication extends Component {
  render() {
    const { user } = this.props

    if (user && user.token) {
      return <React.Fragment>{this.props.children}</React.Fragment>
    } else {
      return <Redirect to='/signin' />
    }
  }
}

export default connect(
  ({ auth }) => ({ user: auth.user })
)(Authentication)
