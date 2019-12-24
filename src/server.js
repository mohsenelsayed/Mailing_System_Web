const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Message = require('./models/Message');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

mongoose.connect('mongodb://localhost:27017/ratethem', {useNewUrlParser: true, useUnifiedTopology: true});

function newMessage(to,from,content) {
    let MsgsCounter =  Message.where({}).countDocuments(async (err,count) => {
        if(err) return handleError(err);
        const newMessage = new Message({
            id: JSON.stringify(count),
            to,
            from,
            content
        })
        await newMessage.save();
    });
}

function newUser(name, email, password){
    const newUser = new User({
        name,
        email,
        password
    })
    newUser.save();
}

function sendEmail(to,subject,text){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'mohsenalsayed4@gmail.com',
        pass: 'tyzak7amra'
        }
  });
  
  let mailOptions = {
    from: 'mohsenalsayed4@gmail.com',
    to,
    subject,
    text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
}

const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use('/api/login', Auth);
App.use('/api/register', Reg);
App.use('/home', Secured);
App.post('/api/login' , async (req,res) => {
    let {username, password} = req.body;
    await User.findOne({name: username}, (err,myUser) => {
        if(err || !myUser || myUser.password != password){
            res.status(300).send("Wrong Credentials! Try again...");
        }else{
            jwt.sign({myUser}, 'usertoken', (err,usertoken) => {
                res.set({"userToken": usertoken,"userdata": JSON.stringify(req.body)}).sendStatus(200);
            })
        }
    });
})
App.post('/api/register', async (req,res) => {
    let {username,email,password} = req.body;
    newUser(username,email,password)
    res.status(200).send("Registered Successfully!");
})

App.post('/home',(req,res) => {
    res.sendStatus(200);
})


let resetTokens = [];
App.post('/api/forgotpw', async (req,res) => {
    let email = req.body.email;
    myUser = await User.findOne({email});
    if(myUser){
        jwt.sign({myUser}, 'resetToken', (err,usertoken) => {
            if(err){ console.log(err); }
            else{
                resetTokens.push(usertoken);
                sendEmail(email,"D-Mail password reset", `To reset your D-Mail password please click on this link: http://localhost:3000/newpassword/${usertoken}`);
            }
        })
        res.status(200).send("Reset password link was sent to your email!");
    }else{
        res.status(400).send("Email was not found.");
    }
})

App.post('/api/newpassword/:usertoken', async (req,res) => {
    let userToken = req.params.usertoken;
    let index = resetTokens.indexOf(userToken);
    if(index !== -1){
        jwt.verify(userToken, "resetToken", async (err,data) => {
            if(err){
                console.log(err);
            }else{
                let user = await User.findOne({email: data.myUser.email});
                user.password = req.body.password;
                await user.save();
                resetTokens.splice(index,1);
                console.log(`${data.myUser.email} Changed password to: ${req.body.password}`);
                res.status(200).send("Password updated successfully!");
            }
        })
    }else{
        res.sendStatus(404);
    }
})


function Auth(req,res,next){
    let {username, password} = req.body;
    if(username && password){
        next();
    }else{
        res.status(300).send("Wrong inputs. Try again...");
    }
}

function Reg(req,res,next){
    let {username, email, password, cnfrmpassword} = req.body;

    if(username && password && email && password == cnfrmpassword){
        next();
    }else{
        res.status(300).send("Wrong inputs. Try again...");
    }
}

function Secured(req,res,next){
    const sentToken = req.body.authorization;
    if(sentToken !== undefined){
        jwt.verify(sentToken, 'usertoken', (err,data) => {
            if(err){
                console.log("Wrong token");
                res.sendStatus(403);
            }else{
                console.log(`${JSON.stringify(data.myUser.name)} has logged in.`);
                res.json({
                    message: "Welcome to Homepage!",
                    data
                });
            }
        })
        next();
    }else{
        res.status(403).send("Token cannot be empty");
    }
}

App.listen(1234, () => console.log("Listening to port 1234"));