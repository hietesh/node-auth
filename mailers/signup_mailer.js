const nodeMailer = require('../config/nodemailer');

exports.signedUpUser = (user)=> {
    nodeMailer.transporter.sendMail({
        from:'hietesh@gmail.com',
        to:user.email,
        subject:'Signed Up Successfully',
        html:`<h1>Hello ${user.username} your account is created successfully</h1>`
    },(err,info)=>{
        if(err){console.log("err in mail send",err); return;}
        console.log("Mail Sent", info);
        return;
    })
}