const express = require('express');
const router =  require('express').Router();
const passport = require('passport');


//initiate controllers as per req
const localAuthController = require('../controllers/local-auth-controller');

// define routes are per req
router.get('/login',localAuthController.sign_in);

router.post('/login',passport.authenticate('local', {failureRedirect: 'login',failureFlash : true}),localAuthController.login_auth);


// reset password
router.get('/reset-password',localAuthController.reset_password);

router.post('/reset-password',localAuthController.change_password);

router.get('/sign-up',localAuthController.sign_up);

router.post('/sign-up',localAuthController.addUser);

router.get('/welcome',
    function(req,res,next){
        if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('login')
    }}
    ,localAuthController.welcome);


router.get('/sign-out',localAuthController.signout);


// google auth related routes
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

// google callback redirection
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/app/login',successRedirect:'/app/welcome'}))

// forgot password
router.get('/forgot-password',localAuthController.forgot_password);

//send mail on the post request
router.post('/forgot-password',localAuthController.forgot_send);


//password reset redirection 
router.get('/password-reset/:user_id/:token/',localAuthController.check_link);

//password set passwords
router.post('/password-reset',localAuthController.forgot_reset);

module.exports = router;