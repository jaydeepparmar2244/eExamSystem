const UserModel = require('../model/user-model')
const bcrypt = require('bcrypt') 

module.exports.addUser = async function(req,res){
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let gender = req.body.gender
    let email = req.body.email
    let password = req.body.password
    let encPassword = bcrypt.hashSync(password,10)
    let role = req.body.role
    let user = new UserModel({
        firstName:firstName,
        lastName:lastName,
        gender:gender,
        email:email,
        password:encPassword,
        role:role,
    })
    await user.populate('role');
    await user.save(function(err,data){
        if(err){
            console.log(err)
            res.json({msg:"Something Went Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Signed Up!",status:200,data:data})
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

module.exports.listOneUser = function(req,res){
    let userId = req.params.userId
    UserModel.findById(userId).populate('role').exec(function(err,data){
        if(err){
            res.json({msg:"SWW",status:-1,data:err})
        }
        else{
            res.json({msg:"One User...",status:200,data:data})
        }
    })
}


module.exports.updateUser = function(req,res){
    let userId = req.params.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let gender = req.body.gender
    let role = req.body.role
    let email = req.body.email
    let password = req.body.password
    UserModel.findByIdAndUpdate(userId,{firstName:firstName,lastName:lastName,gender:gender,role:role,email:email,password:password},
        function(err,data){
            if(err){
                res.json({msg:"sww",status:-1,data:data})
            }
            else{
                res.json({msg:"Updated Exam...",status:200,data:data})
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

module.exports.login = function(req,res){
    let isCorrect = false
    let param_email = req.body.email
    let param_password = req.body.password
    UserModel.findOne({email:param_email}).populate('role').exec(function(err,data){
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