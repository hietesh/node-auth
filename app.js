// required imports

const express = require('express');
const { config } = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const routes  = require('./routes/index');
const mongoose = require('./config/mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const googleStrategy = require('./config/passport-google');
const { db } = require('./models/User');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
//use the dot env
require('dotenv').config();

//init the express app
const app = express();
const PORT = process.env.PORT || 3000;


//for post request 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set the static files
app.use(express.static('./assets'));

//use express layouts
app.use(expressLayouts);

//extract styles and script from pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// use template engine
app.set('view engine','ejs');
app.set('views','./views');



app.use(session({
    name:'login-auth',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:process.env.MONGO_URL,
            autoRemove:'disabled',
        })
  }));

app.use(flash());


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//pass the details to locale
app.use(function(req, res, next){
    if (req.isAuthenticated()){res.locals.user = req.user;}
    next();}
);

//main route start
app.use('/app/',routes);

app.listen(PORT,function(err){
    if(err){
       console.log('Err in starting the server');
    }
    console.log("Server started ",PORT);
});