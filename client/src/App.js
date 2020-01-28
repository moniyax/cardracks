import React from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'
import Base from './components/Base';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BoardAuth from './components/Board/BoardAuth';

const NotFound = () => <div>NotFound</div>

const AppC = styled.div`
height: 100%;
display: flex;
flex-direction: column;
`

const Header = styled.div`
height: 53px;
flex: 0 0 auto;

display: flex;
background: #00aecc;
padding: 4px ;
justify-content: space-between;
align-items: center;
color:#fff;
padding: 0 140px;
`

const Title = styled.div`
font-weight: bold;
font-size: 20px;
`

const Left = styled.div`
`

const Right = styled.div`
  position: relative;
`

class App extends React.Component {

  state = { loggedIn: true };

  onClickHandler(e) {
    e.preventDefault();
    localStorage.removeItem('user');
    this.setState({ loggedIn: false });
  }

  render() {
    const user = JSON.parse(localStorage.getItem('user'))
    return <AppC>
      <ul className='header'>
        <li className='left'></li>
        <li className='title'> <Link to='/' className='title'>CardsInRacks</Link></li>
        <li className='right'> {user ? "Hi " + user['name'] : ''}
        <ul className='nav'>
            <li className="row">
              <a href="#" onClick={this.onClickHandler.bind(this)}>Sign Out</a>
            </li>
        </ul>
        </li>
      </ul>

      <Switch>
        <Route path='/' exact component={Base} />
        <Route path='/boards/:id' component={BoardAuth} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </AppC>
  }

}

export default App;