const express = require('express');
const app = express();
const User = require('../models/User');
const Token = require('../models/Token');
const bcrpyt = require('bcryptjs');
const emailSent = require('../mailers/signup_mailer');
const forgotmailSent = require('../mailers/forgot_mailer');
const { response } = require('express');
const generator = require('generate-password');

// sign in controller
module.exports.sign_in = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('welcome');
    }
    const err = req.flash('error')[0]
    res.render('login',{title:"Login",message: err});
    
}

// login after authorization
module.exports.login_auth = function(req,res){
    res.redirect('welcome');
}

// sign up controller
module.exports.sign_up = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('welcome');
    }
    res.render('sign_up',{title:"signUp"});
}

// add user
module.exports.addUser = async function(req,res){
    const userDetails = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });
    try{
        const savedUser = await userDetails.save();
        console.log(savedUser);
        // send emails 
        emailSent.signedUpUser(savedUser);
        res.json({result:savedUser,redirectUrl:'login'});
    }
    catch(err){
        if(err.keyPattern.hasOwnProperty('email')){
            res.json({error:'Email already in use'});
        }
        else if(err.keyPattern.hasOwnProperty('username')){
            res.json({error:'Username already in use'}); 
        }else{
            res.json({error:'Something went wrong please try again later'});
        }
    }
}

// welcome page controller
module.exports.welcome = (req,res)=>{
    res.render('welcome',{title:'Welcome'});
}

//sign out controller 
module.exports.signout = (req,res)=>{
    req.logout(function(err){
       if(err){return err}
       res.redirect('login');
    });
   
}

// reset password
module.exports.reset_password = function(req,res){
    if(req.isAuthenticated()){
        return res.render('reset_password',{title:'Reset Password'});;
    }
    res.redirect('login');
}

// update password
module.exports.change_password = async function(req,res){
    try{
        // check if the password entered is correct
        const result = await User.findOne({email:req.user.email});
        console.log(result);
        if(result){
            console.log(result.password);
            console.log(req.body.password);
            console.log(req.body.new_password);
            bcrpyt.compare(req.body.password,result.password,async (err,isValid)=>{
                if(err){
                    console.log('something went wrong');
                    return res.json({error:'something went wrong'});
                }
                if(!isValid){
                    console.log('wrong password');
                    return res.json({error:'wrong password'});
                }
                else{
                    // hash the password
                    const salt = await bcrpyt.genSalt(10);
                    const hashedPassword = await bcrpyt.hash(req.body.new_password, salt);
                    // update the password
                    User.findOneAndUpdate({_id:result._id},{password:hashedPassword},null,
                    function(err,info){
                        if(err){res.json({error:err});return;}
                        return res.json({success:"Password Updated",info:info});
                    });
                }
            })
        }
        else{
            res.json({error:"Invalid Username"});
        }
    }
    catch(err){
        console.log(err);
    }
}

// forgot password
module.exports.forgot_password = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('welcome');
    }
    res.render('forgot_password',{title:'Forgot Password'});
}

// send mail when password forgot
module.exports.forgot_send = async function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('welcome');
    }
    const email = req.body.email;
    try{
        const user = await User.findOne({email:email});
        if(user){
            let token = await Token.findOne({ userId: user._id });
            if(!token){
                const salt = await bcrpyt.genSalt(10);
                let userToken= await bcrpyt.hash(generator.generate({
                    length: 10,
                    numbers: true
                }), salt);
                userToken=userToken.replace(/\/|\./g,'');
                console.log(userToken);
                token = await new Token({
                    userId:user._id,
                    token:userToken
                }).save();
            }
            const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
            forgotmailSent.forgotMail(user,link)
            .then(response => res.json(response))
            .catch(err => res.json(err));  
        }
        else{
            res.json({error:"Please check email and try again"});
        } 
    }
    catch(err){
        console.log(err);
    }
}

module.exports.check_link = async function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('welcome');
    } 
   const user_id = req.params.user_id;
   const token = req.params.token;

   const user = await User.findOne({user_id});
   if(!user){
      return res.send('Invalid link or Token Expired');
   }
   const checkToken = await Token.findOne({token:token});
   if(!checkToken){
        return res.send('Invalid link or Token Expired');
   }
   res.render('reset_forgot',{title:'Reset Forgot Password'});
}

module.exports.forgot_reset = async function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('welcome');
    }
    try{
        // check if the password entered is correct
        const result = await User.findOne({_id:req.body.user_id});
        console.log(result);
        if(result){
            console.log(result.password);
            console.log(req.body.new_password);
            const salt = await bcrpyt.genSalt(10);
            const hashedPassword = await bcrpyt.hash(req.body.new_password, salt);
            // update the password
            User.findOneAndUpdate({_id:result._id},{password:hashedPassword},null,
            function(err,info){
                if(err){res.json({error:"Error in Update"});return;}
                return res.json({success:"Password Updated",info:info});
            });
        }
        else{
            return res.json({error:"Invalid Action"});
        }
    }
    catch(err){
        return res.json({error:"Invalid Action"});
    }
}    