const mongoose = require('mongoose')

//create schema of role
let RoleSchema = mongoose.Schema({
    roleName:{
        type:String
    }
})

//create model
let RoleModel = mongoose.model('roles',RoleSchema)

module.exports = RoleModel