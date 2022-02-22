const mongoose = require('mongoose')

let ExamUserSchema = mongoose.Schema({
    exam:{
        type:mongoose.Types.ObjectId,
        ref:"exams"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    }
})

let ExamUserModel = mongoose.model("examUsers",ExamUserSchema)

module.exports = ExamUserModel