const bcrpyt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// authentication using passport
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({$or:[{username:username},{email:username}]},function(err,user){
            if(err){
                done(err,);
            }
            if(!user){
                done(null,false,{message:"Invalid Username"});
            }
            else{
                bcrpyt.compare(password,user.password,(err,isValid)=>{
                    if(err){
                        return done(err);
                    }
                    if(!isValid){
                        return done(null,false,{message:"Invalid Password"});
                    }
                    return done(null,user);   
                })
            }
        })
    }
));


passport.serializeUser(function(user, done) {
    done(null,user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err){
            console.log("Error in finding user")
        }
        return done(null,user);
    }) 
});


//check user authenctication
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('welcome');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req contains current signed in user from session cookie and we just sending in the locals the use
        res.locals.user = req.user;
    }
}


module.exports = passport;