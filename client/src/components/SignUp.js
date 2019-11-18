import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom'

export default class SignUp extends Component {
  state = {loggedIn: 'false'};

  handleSubmit(e) {
    e.preventDefault();
    fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        'name': this.refs.name.value,
        'email': this.refs.email.value,
        'password': this.refs.password.value,
      })
    }).then((res) => {
      console.log('======');
      console.log('res.ok', res.ok);
      let res_json = res.json();
      console.log('res.json()', res_json);
      if (!res.ok) throw Error(res);
      return res_json;
    }).then((r) => {
      localStorage.setItem('user', JSON.stringify(r));
      this.setState({loggedIn: 'true'})
    }).catch((err) => {
      console.log('signUp: failed', err['body']);
      this.setState({loggedIn: 'failed'})
    });
  }

  content() {
    return <div style={{textAlign: 'left'}}>
      <h2>Sign Up</h2>
      {console.log('state', this.state)}

      <div>
        {this.state.loggedIn === 'failed' ? <div style={{color: 'red'}}>Wrong email or password</div> : console.log('jack')}
      </div>

      <form onSubmit={this.handleSubmit.bind(this)}>
        <div>
          <div>Name:</div>
          <input type="text" ref="name"/>
        </div>
        <div>
          <div>Email:</div>
          <input type="text" ref="email"/>
        </div>
        <div>
          <div>Password:</div>
          <input type="text" ref="password"/>
        </div>
        <input type="submit" value="Sign Up"/>
      </form>
      <Link to='/signin'>Log In</Link>

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