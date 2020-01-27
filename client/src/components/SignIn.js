import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'

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
    return <div style={{textAlign: 'left'}}>
      <h2>Log In</h2>

      <div>
        {this.state.loggedIn === 'failed' ?
            <div style={{color: 'red'}}>Wrong email or password</div> : console.log('loggedIn === true')}
      </div>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <div>Email:</div>
          <input type="text" ref="email"/>
        </div>
        <div>
          <div>Password:</div>
          <input type="password" ref="password"/>
        </div>
        <input type="submit" value="Log in"/>
      </form>
      <Link to='/signup'>Sign Up</Link>
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