import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Forgotpw extends Component {

    render(){
        return(
            <div className="form fpw-form">
                <label>Enter your email</label>
                <input className="fpw-input" name="email" placeholder="email"></input>
                <input className="submit" type="submit" value="Submit" name="fpw-submit"></input>
                <Link to="/Login">Sign in</Link> 
                <Link to="/register">Register</Link>
            </div>
        )
    }
}