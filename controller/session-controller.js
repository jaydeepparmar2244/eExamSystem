const res = require("express/lib/response");
const fs = require('fs')

function login(req,res){
    res.write("Login!")
    res.end()
}

function signup(req,res){
    let signupHtml = fs.readFileSync('./views/signup.htm')
    res.write(signupHtml)
    res.end()
}

function saveuser(req,res){
    console.log(req.body)
    // res.write('Data Saved!')
    res.json({
        msg:'Done!',
        status: 200,
        body:req.body
    })
    res.end()
}
//exporting
module.exports.saveuser = saveuser
module.exports.login = login
module.exports.signup = signup