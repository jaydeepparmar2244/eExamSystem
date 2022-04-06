const fs = require('fs')
const nodemailer = require("nodemailer");
const UserModel = require('../model/user-model');
const crypto = require('crypto')
const bcrypt = require('bcrypt')

function login(req, res) {
    res.write("Login!")
    res.end()
}

function signup(req, res) {
    let signupHtml = fs.readFileSync('./views/signup.htm')
    res.write(signupHtml)
    res.end()
}

function saveuser(req, res) {
    console.log(req.body)
    // res.write('Data Saved!')
    res.json({
        msg: 'Done!',
        status: 200,
        body: req.body
    })
    res.end()
}

module.exports.mailLinkToResetPassword = function (req, res) {
    let email = req.body.email
    if(email===null){
        // console.log('email requireed')
        res.json({msg:"Email is required!",status:-1,data:err})
    }
    else{
        UserModel.findOne({email:email},function(err,data){
            if(err || data ==null){
                // console.log('email not found!')
                res.json({msg:"Email not found",status:-1,data:err})
            }
            else{
                const token = crypto.randomBytes(20).toString('hex');
                // console.log(token)
                data.update({
                    resetPasswordToken:token,
                    resetPasswordExpires:Date.now() + 3600000
                });
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'jaydeep2244.67@gmail.com',
                        pass: 'JDparmar@2244'
                    }
                });
                var mailOptions = {
                    from: 'jaydeep2244.67@gmail.com',
                    to: data.email,
                    subject: 'Link to reset Password!',
                    text: "click on this link to reset your password:"+`http://localhost:3000/reset/${token}`
                };
                transporter.sendMail(mailOptions, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Email sent: ' + data.response);
                        res.json({msg:"Email Sent!",status:200,data:data})
                    }
                });
            }
        })

    }
   
}

module.exports.resetPassword = function(req,res){
    let email = req.body.email
    let password =req.body.password
    let hashPassword = bcrypt.hashSync(password,10)
    UserModel.findOneAndUpdate({email:email},{password:hashPassword},function(err,data){
        if(err){
            res.json({msg:"Error",status:-1,data:err})
        }
        else if(data==null){
            res.json({msg:"Email Not FOund!",status:-1,data:data})
        }
        else{
            res.json({msg:"Password Reset!",status:200,data:data})
        }
    })
    
}
//exporting
module.exports.saveuser = saveuser
module.exports.login = login
module.exports.signup = signup