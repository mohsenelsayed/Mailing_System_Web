import React, {Component} from 'react';
import Axios from 'axios';
export default class Newpw extends Component {

    componentDidMount() {
        document.getElementsByClassName("form")[0].addEventListener("keydown", event => {
            if(event.keyCode === 13){
                document.getElementsByClassName("submit")[0].click();
            }
        })
    }

    resetPassword = () => {
        let passwords = document.getElementsByClassName("npw-input");
        if(passwords[0].value && passwords[1].value && passwords[0].value === passwords[1].value){
            Axios.post(`/api/newpassword/${window.location.pathname.replace("/newpassword/", "")}`, {
                "password": passwords[0].value,
                "confirmPassword": passwords[1].value
            }).then(res => {
                alert("Password updated successfully");
                document.getElementsByClassName("home-button")[0].click();
            }).catch(err => {
                alert("Unauthorized! GET OUT");
            });
        }else{
            alert("Invalid inputs, Please try again.");
        }
    }

    render(){
        return(
            <div className="form npw-form">
                <label>Your new password:</label>
                <input className="npw-input" name="password" type="password" placeholder="New password" required/>
                <label>Confirm new password:</label>
                <input className="npw-input" name="password" type="password" placeholder="Confirm password" required/>
                <input className="submit" type="submit" value="Submit" name="npw-submit" onClick={this.resetPassword}/>
            </div>
        )
    }
}