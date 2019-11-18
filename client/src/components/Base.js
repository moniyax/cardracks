import Authentication from './Authentication';
import React,{Component} from 'react';
import BoardIndex from './Board/BoardIndex';

export default class Base extends Component {
  render() {
    return <Authentication>
      <BoardIndex/>
    </Authentication>
  }
}
