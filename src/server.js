const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost:27017/ratethem', {useNewUrlParser: true});

const App = express();
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use('/api/login', Auth);
App.use('/api/register', Reg);
App.use('/home', Secured);
App.post('/api/login' , async (req,res) => {
    let {username, password} = req.body;
    console.log(req.body);
        await User.findOne({name: username}, (err,myUser) => {
            if(err || !myUser || myUser.password != password){
                res.status(300).send("Wrong Credentials! Try again...");
            }else{
                jwt.sign({myUser}, 'usertoken', (err,usertoken) => {
                    res.header("userToken", usertoken).sendStatus(200);
                })
            }

    });
})
App.post('/api/register', async (req,res) => {
    let {username, password} = req.body;
    console.log(req.body);
    const newUser = new User({
        name: username,
        password: password
    })
    await newUser.save();
    console.log("User registered: " + username);
    res.status(200).send("Registered Successfully!");
})


App.post('/home',(req,res) => {
    console.log("Home reached");
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
    let {username, password, cnfrmpassword} = req.body;
    if(username && password && password == cnfrmpassword){
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
                console.log(err);
                res.sendStatus(403);
            }else{
                console.log("Verified Successfully!");
                res.json({
                    message: "Welcome to Homepage!",
                    data
                });
            }
        })
        next();
    }else{
        console.log("Wrong token" + " Token: " + sentToken);
        res.status(403).send("Wrong token");
    }
}

App.listen(1234, () => console.log("Listening to port 1234"));