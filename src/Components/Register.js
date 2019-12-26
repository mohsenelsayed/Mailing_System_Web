import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios');
class Register extends Component{

  componentDidMount() {
    document.getElementsByClassName("form")[0].addEventListener("keydown", event => {
        if(event.keyCode === 13){
            document.getElementsByClassName("submit")[0].click();
        }
    })
  }

  register = () => {
      let inputs = document.getElementsByClassName("form")[0].getElementsByTagName("input");
      let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(emailReg.test(inputs[1].value)){
        axios.post('/api/register', {
          username: inputs[0].value,
          email: inputs[1].value,
          password: inputs[2].value,
          cnfrmpassword: inputs[3].value
        })
        .then(function (response) {
          alert("User Registered Successfully");
          document.getElementsByClassName("home-button")[0].click();
        })
        .catch(function (error) {
          alert("Email/Username already taken :(");
        });
      }else{
        alert("Please enter a valid email.");
      }
  }

  render(){
      return(
          <div className="form reg-form">
              <label>Username:</label> <input type="text" name="username" required/>
              <label>Email: </label><input type="email" name="email" required/>
              <label>Password: </label><input type="password" name="password" required/>
              <label>Confirm Password: </label><input type="password" name="cnfrmpassword" required/>
              <input className="submit" type="submit" value="Register" onClick={this.register}/>
              <Link to="/login">Sign in</Link>
          </div>
      )
  }
}

export default Register;