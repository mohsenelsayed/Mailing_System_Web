import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

export default class Forgotpw extends Component {
    constructor(props){
        super();
    }

    componentDidMount() {
        document.getElementsByClassName("form")[0].addEventListener("keydown", event => {
            if(event.keyCode === 13){
                document.getElementsByClassName("submit")[0].click();
            }
        })
    }

    sendEmail = () => {
        let email = document.getElementsByClassName("fpw-input")[0].value;
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(emailReg.test(email)){
            Axios.post("/api/forgotpw", {
                email
            }).then(res => {
                alert("Reset password link was sent to email!");
            }).catch(err => {
                alert("Email was not found");
            })
        }else{
            alert("Please enter a valid email");
        }
    }

    render(){
        return(
            <div className="form fpw-form">
                <label>Enter your email</label>
                <input className="fpw-input" name="email" placeholder="e-mail" required/>
                <input className="submit" type="submit" value="Submit" name="fpw-submit" onClick={this.sendEmail}/>
                <div>
                    <Link to="/Login">Sign in</Link>
                    <span>|</span>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        )
    }
}