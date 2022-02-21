const UserModel = require('../model/user-model')
const bcrypt = require('bcrypt') 

module.exports.addUser = function(req,res){
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let encPassword = bcrypt.hashSync(password,10)
    let role = req.body.role
    let user = new UserModel({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:encPassword,
        role:role
    })
    user.save(function(err,data){
        if(err){
            console.log(err)
            res.json({msg:"Something Went Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"User Added!",status:200,data:data})
        }
    })
}

module.exports.listAllUser = function(req,res){
    UserModel.find().populate('role').exec(function(err,data){
        if(err){
            console.log(err)
            res.json({msg:"Something Went Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Users...",status:200,data:data})
        }
    })
}

module.exports.deleteUser = function(req,res){
    let userId = req.params.userId
    UserModel.deleteOne({"_id":userId},function(err,data){
        if(err){
            console.log(err)
            res.json({msg:"Something Went Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"User Deleted!",status:200,data:data})
        }
    })
}

module.exports.updateUser = function(req,res){
    let userId = req.body.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email
    let password = req.body.password
    let encPassword =bcrypt.hashSync(password,10)
    let role = req.body.role
    UserModel.updateOne(
        {_id:userId},
        {firstName:firstName,lastName:lastName,email:email,password:encPassword,role:role},
        function(err,data){
            if(err){
                console.log(err)
                res.json({msg:"Something Went Wrong!",status:-1,data:err})
            }
            else{
                res.json({msg:"User Updated!",status:200,data:data})
            }
        })
}

module.exports.login = function(req,res){
    let isCorrect = false
    let param_email = req.body.email
    let param_password = req.body.password
    UserModel.findOne({email:param_email},function(err,data){
      if(data){
         let ans = bcrypt.compareSync(param_password,data.password)
         if(ans == true){
             isCorrect = true
         }
      }   
     
      if(isCorrect == false){
         res.json({msg:"Invalid Credentials!",status:-1,data:req.body})
      }
      else{
         res.json({msg:"Login Successful!",status:200,data:data})
      }
    })
}