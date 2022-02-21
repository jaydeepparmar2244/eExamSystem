const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type: mongoose.Types.ObjectId,
        ref: "roles"
    }
})

let UserModel = mongoose.model("users",UserSchema)

module.exports = UserModel