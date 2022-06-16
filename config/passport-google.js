const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const bcrpyt = require('bcryptjs');
const User = require('../models/User');

//use the dot env
require('dotenv').config();

// passport using google login strategy
passport.use(new googleStrategy({
     clientID : process.env.CLIENT_ID,
     clientSecret:process.env.CLIENT_SECRET,
     callbackURL:process.env.CALLBACK_URL,

},  function(accessToken,refreshToken,profile,done){
    User.findOne({email:profile.emails[0].value}).exec( async function(err,user){
        if(err){console.log(err); }

        if(user){
            // user found and set is logged in user
            return done(null,user)
        }
        else{
            // user found not found created the user with some random password
            const salt = await bcrpyt.genSalt(10);
            const userPassword = await bcrpyt.hash(Math.random().toString(36).slice(-8), salt);
            User.create({
                username:profile.emails[0].value,
                email:profile.emails[0].value,
                password: userPassword
            },function(err,user){
                if(err){return done(err);}
                return done(null,user);
            })
        }    
    })
}))

module.exports = passport;