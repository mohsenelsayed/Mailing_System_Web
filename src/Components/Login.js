import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios');


class Login extends Component{
    constructor(props){
        super();
    }
    onUserLogin = (userData) => {
        this.props.userLogged(userData);
    }
    login = () => {
        let inputs = document.getElementsByClassName("form")[0].getElementsByTagName("input");

        axios.post('/api/login', {
            username: inputs[0].value,
            password: inputs[1].value
          })
          .then( res => {
            this.onUserLogin(JSON.parse(res.headers.userdata));
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
                <label>Username:</label> <input type="text" name="username" required/>
                <label>Password: </label><input type="password" name="password" required/>
                <input className="submit" type="submit" value="Login" onClick={this.login} required/>
                <Link to="/forgotpw"><input className="submit" type="submit" value="Forgot password?" onClick={this.forgotpw} /> </Link>
                <Link to="/register" className="enter-instead">Create new account</Link>
            </div>
        )
    }
}
export default Login;