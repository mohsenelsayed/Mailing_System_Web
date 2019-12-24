import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Forgotpw from './Components/Forgotpw';
import Newpw from './Components/Newpw';
import './App.css';

export default class App extends Component{
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      userData: {
        name: undefined,
        token: undefined
      }
    }
  }
  userLogged = (userData) => {
    this.setState({
      loggedIn: true,
      userData: {
        name: userData.username,
        token: userData.usertoken
      }
    })
  }
  userLoggedOut = () => {
    this.setState({
      loggedIn: false,
      userData: {
        name: undefined,
        token: undefined
      }
    })
  }

  render(){
    return(
      <React.Fragment>
        <Router>
          <Link className="st-a home-button" to="/home">Home</Link>
          <Switch>
            <Route exact path="/">
            <h2 className="welcome-phrase">Welcome to <span>D</span>-Mail</h2>
              <Link to="/register" className="st-a">Register</Link>
              <Link to="/login" className="st-a">Login</Link>
            </Route>
            <Route exact path="/register" >
              <Register/>
            </Route>
            <Route exact path="/login" >
              <Login userLogged={this.userLogged} />
            </Route>
            <Route exact path="/home" >
              <Home loggedStatus={this.state.loggedIn} userData={this.state.userData} userLoggedOut={this.userLoggedOut} />
            </Route>
            <Route exact path="/forgotpw" >
              <Forgotpw />
            </Route>
            <Route path="/newpassword/" >
              <Newpw />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}
