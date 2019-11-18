import React from 'react';
import { Route, Switch } from 'react-router-dom'
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
overflow: hidden;
padding: 4px ;
justify-content: space-between;
align-items: center;
color:#fff;
`

const Title = styled.div`
font-weight: bold;
font-size: 20px;
`

const Left = styled.div`
`

const Right = styled.div`
`

const App = () => <AppC>
  <Header>
    <Left></Left>
    <Title>CardsInRacks</Title>
    <Right></Right>

  </Header>
  <Switch>
    <Route path='/' exact component={Base} />
    <Route path='/boards/:id' component={BoardAuth} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route component={NotFound} />
  </Switch>
</AppC>

export default App;