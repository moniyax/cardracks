import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export default class Authentication extends Component {
  render() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
      return <React.Fragment>{this.props.children}</React.Fragment>
    } else {
      return <Redirect to='/signin'/>
    }
  }
}