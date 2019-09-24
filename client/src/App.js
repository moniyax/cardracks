import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import BoardIndex from './components/Board/BoardIndex'
import styled from 'styled-components'
import ShowBoard from "./components/Board/ShowBoard";

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
class App extends Component {
  componentDidMount() {
    window.fetch('/api/boards')
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  }
  render() {
    return <AppC>
    <Header>
      <Left></Left>
      <Title>CardsInRacks</Title>
      <Right></Right>

    </Header>
    <Switch>
      <Route path='/' exact component={BoardIndex} />
      <Route path='/boards/:id' component={ShowBoard} />
      <Route component={NotFound} />
    </Switch>
  </AppC>
  }
}

// export default () => (
//   <App>
//     <Header>
//       <Left></Left>
//       <Title>CardsInRacks</Title>
//       <Right></Right>

//     </Header>
//     <Switch>
//       <Route path='/' exact component={BoardIndex} />
//       <Route path='/boards/:id' component={ShowBoard} />
//       <Route component={NotFound} />
//     </Switch>
//   </App>
// )

export default App;