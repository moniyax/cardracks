import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'
import "./SignIn.css";
export default class SignIn extends Component {
  state = {
    loggedIn: 'false'
  };

  handleSubmit(e) {
    e.preventDefault();
    fetch('api/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        'email': this.refs.email.value,
        'password': this.refs.password.value,
      })
    }).then((res) => {
      let res_json = res.json();
      if (!res.ok) throw Error(res);
      return res_json;
    }).then((r) => {
      localStorage.setItem('user', JSON.stringify(r));
      this.setState({loggedIn: 'true'})
    }).catch((err) => {
      this.setState({loggedIn: 'failed'})
    });
  }

  content() {
    return <div class="auth-box">
    <h2>Log In</h2>
    <form className="auth-form" onSubmit={this.handleSubmit.bind(this)}>
      <div className="field">
        <div>Email:</div>
        <input type="text" ref="email"></input>
      </div>
      <div className="field">
          <div>Password:</div>
          <input type="password"  ref="password"></input>
      </div>
      <input type="submit" value="Log in"></input>
    </form>
    <a href="/signup">Sign Up</a>
  </div>
  }

  render() {
    if (this.state.loggedIn === 'true') {
      return <Redirect to='/'></Redirect>
    } else {
      return this.content()
    }
  }
}