const nodeMailer = require('../config/nodemailer');

exports.forgotMail = (user,link)=> {
    return new Promise( function(resolve,reject){
        nodeMailer.transporter.sendMail({
            from:'admin@noreply.com',
            to:user.email,
            subject:'Reset your password',
            html:`<h2>Hello ${user.username} you can reset your password clicking on below link</h2> <a href="${link}">Reset Password</a> <p><i>This link is valid only for sometime</i></p>`
        },(err,info)=>{
            if(err){console.log("err in mail send",err);  
                reject({error:"Something went wrong please try again"});
            }
            resolve({success:"Mail Sent, Redirecting to login",redirectUrl:'login'});
        })      
    }
    );
}