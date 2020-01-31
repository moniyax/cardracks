import React from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'
import Base from './components/Base';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import BoardAuth from './components/Board/BoardAuth';
import Header from "./Header";
import Alert from "./Alert";

const NotFound = () => <div>NotFound</div>

const AppC = styled.div`
height: 100%;
display: flex;
flex-direction: column;
`

class App extends React.Component {

  state = { loggedIn: true };


  render() {
    return <AppC>
      <Alert/>
      <Header/>

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