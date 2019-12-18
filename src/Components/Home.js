import React, {Component} from 'react';
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
                <h1>Welcome to Homepage!</h1>
            )
        }else{
            return(
                <h1>Please Login first.</h1>
            )
        }
    }
}