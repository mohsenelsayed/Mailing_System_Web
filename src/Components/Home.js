import React, {Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import loggedUserToken from './Login';
const axios = require('axios');

export default class Home extends Component{
    constructor(props){
        super(props);
        axios.post('/home', {"authorization": this.props.loggedUserToken
    })
    }
    render(){
        if(this.props.loggedStatus){
            return(
                <React.Fragment>
                    <Link to="/" className="st-a logout-button">Logout</Link>
                    <h1>Welcome to Homepage!</h1>
                </React.Fragment>
            )
        }else{
            return(
                <h1>Please <Link to="/login">Login</Link> first.</h1>
            )
        }
    }
}