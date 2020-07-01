import React, { Component } from 'react';
import { Route, Switch, Router} from 'react-router-dom';
import './App.css';
import Dashboard from './Pages/Dashboard';
import Splash from './Pages/Splash';
import Connect from './Pages/Connect';
import Authenticating from './Pages/Authenticating';
import TwitterConfiguration from './Pages/TwitterConfiguration';
import TwitterConfig from './Pages/TwitterConfig/TwitterConfig';
import Error from './Pages/Error';
import Login from './Pages/Login/Login';
import SettingsPage from './Pages/Settings/settings';
import Home from "./components/Home";
import history from "../history";
import Register from './Pages/Register/register';
import SignOut from './Pages/SignOut';
const axios = require('axios');

export class App extends Component{
  render(){
    return (
      <div>
    <div className="App-content">
    <Router history={history}>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/splash' component={Splash}/>
        <Route exact path='/connect' component={Connect}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/callback" component={Authenticating}/>
        <Route exact path="/error" component={Error}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/settings" component={SettingsPage}/>
        <Route path="/settings/:cmp" component={SettingsPage}/>
        <Route exact path="/logout" component={SignOut}/>
        <Route path="/twitter/:account" component={TwitterConfig}/>
      </Router>
    </div>
  </div>
    )
  }
}
