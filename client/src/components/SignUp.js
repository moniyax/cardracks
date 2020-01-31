import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import { connect } from "react-redux";
import signUp from "../actions/SignUp";
import SignUpForm from "./SignUpForm";

class SignUp extends Component {
  content() {
    return (
      <div className="auth-box">
        <h2>Sign Up</h2>
        <SignUpForm onSubmit={({ name, email, password }) => {
          this.props.signUp(name, email, password)
        }} />
        <a href="/signin">Log In</a>
      </div>
    )
  }

  render() {
    if (this.props.loggedIn === true) {
      return <Redirect to='/'></Redirect>
    } else {
      return this.content()
    }
  }
}

export default connect(
  ({ auth }) => ({ loggedIn: auth.loggedIn }),
  { signUp }
)(SignUp)
