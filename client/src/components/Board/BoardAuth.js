import Authentication from '../Authentication';
import React,{Component} from 'react';
import Board from './Board';

export default class BoardAuth extends Component {
  render() {
    return <Authentication>
      <Board match={this.props.match}/>
    </Authentication>
  }
}
