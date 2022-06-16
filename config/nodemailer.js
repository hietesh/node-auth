const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_SECRET
    }
});


let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(path.join(__dirnamen,'../views/mailers'),relativePath,data,function(err,template){
        if(err){console.log('err in render'); return;}
        mailHTML = template;
    });
    return mailHTML;
}

module.exports= {
    transporter,
    renderTemplate
}