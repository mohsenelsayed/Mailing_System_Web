import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const axios = require('axios');

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            sendMailWindow: false
        }
        axios.post('/home', {"authorization": this.props.userData.token
    }).catch(err => {})
    console.log(`data: ${JSON.stringify(this.props)}`);
    }

    componentDidUpdate() {
        if(this.state.sendMailWindow){
            document.getElementsByClassName("form")[0].addEventListener("keydown", event => {
                if(event.keyCode === 13){
                    document.getElementsByClassName("submit")[0].click();
                }else if(event.keyCode === 27){
                    document.getElementsByClassName("sendMailWindowClose")[0].click();
                }
            });


            document.getElementsByClassName("msgContent")[0].addEventListener("keydown", event => {
                if(event.keyCode === 9){
                    event.preventDefault();
                    document.getElementsByClassName("msgContent")[0].value += "   ";
                }
            })
        }
    }

    sendMail = () => {
        let from = this.props.userData.email,
            to = document.getElementById("email_to").value,
            subject = document.getElementById("email_subject").value,
            content = document.getElementById("email_content").value;

            if(to,subject,content){
                axios.post('/api/sendmsg', {
                    from,to,subject,content
                }).then( res => {
                    alert("Email sent successfully!");
                    document.getElementsByClassName("sendMailWindowClose")[0].click();
                }).catch( err => {
                    if(err){
                        alert("Service not available right now :(, Try again later.");
                    }
                })
            }else{
                alert("You have to fill all fields. Try again!");
            }
    }


    logOut = () => {
        this.props.userLoggedOut();
    }

    toggleSendMailWindow = () => {
        this.setState({
            sendMailWindow: !this.state.sendMailWindow
        })
    }

    render(){
        if(this.props.loggedStatus){
            return(
                <React.Fragment>
                    <Link to="/" className="st-a logout-button" onClick={this.logOut}>Logout</Link>
                    {
                        this.state.sendMailWindow?

                        <div className="sendMailWindow">
                            <div className="form sendMailForm">
                                <button className="sendMailWindowClose" onClick={this.toggleSendMailWindow}> x </button>
                                <div className="row">
                                <label>To:</label> <input id="email_to" type="text" placeholder="email address" />
                                </div>

                                <div className="row">
                                <label>Subject:</label> <input id="email_subject" type="text" placeholder="mail subject" />
                                </div>

                                <div className="row">
                                <label>Message:</label> <textarea id="email_content" className="msgContent" placeholder="message content" />
                                </div>
                                <div className="row"><input className="submit" type="submit" value="Send" onClick={this.sendMail} /></div>
                            </div>
                        </div> 
                        : ""
                    }
                    <button className="sendMailWindowOpen" onClick={this.toggleSendMailWindow}> New mail </button>
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