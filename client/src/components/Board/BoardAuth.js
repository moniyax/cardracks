import React, { Component } from 'react';
import Board from './Board';
import Authentication from '../Authentication';

export default class BoardAuth extends Component {
  render() {
    return <Authentication>
      <Board match={this.props.match} />
    </Authentication>
  }
}
