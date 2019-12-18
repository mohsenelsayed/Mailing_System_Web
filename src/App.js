import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';
import { render } from '@testing-library/react';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      loggedUserToken: undefined
    }
  }
  userLogged = (userToken) => {
    this.setState({
      loggedIn: true,
      loggedUserToken: userToken
    })
  }
  render(){
    return(
      <React.Fragment>
        <Router>
          <Link className="home-button" to="/"></Link>
          <Link className="logout-button" to="/home">Home</Link>
          <Switch>
            <Route exact path="/">
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/login" >
              <Login userLogged={this.userLogged} />
            </Route>
            <Route exact path="/home" >
              <Home loggedStatus={this.state.loggedIn} loggedUserToken= {this.state.loggedUserToken} />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
