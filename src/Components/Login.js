import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Forgotpw from './Forgotpw';
const axios = require('axios');


class Login extends Component{
    constructor(props){
        super();
        console.log(props.history);
    }
    onUserLogin = (userToken) => {
        this.props.userLogged(userToken);
    }
    login = () => {
        let inputs = document.getElementsByClassName("form")[0].getElementsByTagName("input");

        axios.post('/api/login', {
            username: inputs[0].value,
            password: inputs[1].value
          })
          .then( res => {
            this.onUserLogin(res.headers.usertoken);
            console.log(res.headers.usertoken);
            document.getElementsByClassName("home-button")[0].click();
          })
          .catch(error => {
            if(error){
                alert("Wrong username/password. Please try again!");
            }
          });
    }

    render(){
        return(
            <div className="form login-form">
                <label>Username:</label> <input type="text" name="username"/>
                <label>Password: </label><input type="password" name="password"/>
                <input className="submit" type="submit" value="Login" onClick={this.login}/>
                <Link to="/forgotpw"><input className="submit" type="submit" value="Forgot password?" onClick={this.forgotpw} /> </Link>
                <Link to="/register" className="enter-instead">Create new account</Link>
            </div>
        )
    }
}
export default Login;