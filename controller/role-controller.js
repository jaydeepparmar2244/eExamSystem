const RoleModel = require('../model/role-model')

module.exports.addRole = function(req,res){
    console.log(req.body.roleName)
    let role = new RoleModel({
        roleName:req.body.roleName
    })
    role.save(function(err,success){
        if(err){
            console.log(err)
            res.json({msg:"SWW",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Role Added",status:200,data:success})
        }
    })
    // res.json({
    //     msg:"Role Added!",
    //     status:200
    // })
}

module.exports.listAllRole = function(req,res){
    RoleModel.find(function(err,roles){
        if(err){
            res.json({
                msg:"Something Went Wrong!",
                status:-1,
                data:err
            })
        }
        else{
            res.json({
                msg:"Roles...",
                status:200,
                data:roles
            })
        }
    })
}

module.exports.deleteRole = function(req,res){
    let roleId = req.params.roleId
    RoleModel.deleteOne({"_id":roleId},function(err,data){
        if(err){
            res.json({
                msg:"Something Went Wrong!",
                status:-1,
                data:err
            })
        }
        else{
            res.json({
                msg:"Deleted!",
                status:200,
                data:data
            })
        }
    })

}

module.exports.updateRole = function(req,res){
    let roleId = req.body.roleId
    let roleName = req.body.roleName
    RoleModel.updateOne({_id:roleId},{roleName:roleName},function(err,data){
        if(err){
            res.json({
                msg:"Something Went Wrong!",
                status: -1,
                data:err
            })
        }
        else{
            res.json({
                msg:"Updated!",
                status:200,
                data:data
            })
        }
    })
}









