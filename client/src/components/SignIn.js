import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom'
import signIn from "../actions/SignIn";
import SignInForm from "./SignInForm";
import "./SignIn.css";

class SignIn extends Component {
  content() {
    return (
      <div className="auth-box">
        <h2>Log In</h2>
        <SignInForm onSubmit={({ email, password }) => {
          this.props.signIn(email, password)
        }} />
        <Link to='/signup' >Sign Up</Link>
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

const s2props = (state) => {
  return { loggedIn: state.auth.loggedIn }
}

export default connect(
  s2props,
  { signIn }
)(SignIn)