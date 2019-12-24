import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios');

export default class Home extends Component{
    constructor(props){
        super(props);
        axios.post('/home', {"authorization": this.props.userData.token
    }).catch(err => {})
    }
    logOut = () => {
        this.props.userLoggedOut();
    }
    render(){
        if(this.props.loggedStatus){
            return(
                <React.Fragment>
                    <Link to="/" className="st-a logout-button" onClick={this.logOut}>Logout</Link>
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