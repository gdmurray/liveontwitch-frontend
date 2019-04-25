import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Connect from './Pages/Connect';
import Authenticating from './Pages/Authenticating';
import TwitterConfiguration from './Pages/TwitterConfiguration';
import TwitterConfig from './Pages/TwitterConfig/TwitterConfig';
const axios = require('axios');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      searchQuery: null,
    }
  }
  
  goHome = () => {
    this.props.history.push('/');
  }

  openModalCallback = () => {
    console.log("modal opened??");
    this.setState({
      showModal: true
    })
  }

  refresh = () => {
    this.forceUpdate();
  }
  closeModalCallback = () => {
    console.log("closing modal from app");
    this.setState({
      showModal: false
    })
  }

  routeCallback = (route) => {
    this.props.history.push(route);
  }
  render() {
    const App = () => (
      <div>
        <div className="App-content">
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/connect' component={Connect}/>
            <Route exact path="/callback" component={Authenticating}/>
            <Route path="/twitter/:account" component={TwitterConfig}/>
          </Switch>
        </div>
      </div>
    )
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default withRouter(App);