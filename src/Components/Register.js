import React, {Component} from 'react'
const axios = require('axios');
class Register extends Component{
    register = () => {
        let inputs = document.getElementsByClassName("form")[0].getElementsByTagName("input");

        axios.post('/api/register', {
            username: inputs[0].value,
            password: inputs[1].value,
            cnfrmpassword: inputs[2].value
          })
          .then(function (response) {
            alert("User Registered Successfully");
            document.getElementsByClassName("home-button")[0].click();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
            <div className="form">
                <label>Username:</label> <input type="text" name="username"/>
                <label>Password: </label><input type="password" name="password"/>
                <label>Confirm Password: </label><input type="password" name="cnfrmpassword"/>
                <input className="submit" type="submit" value="Register" onClick={this.register}/>
            </div>
        )
    }
}

export default Register;