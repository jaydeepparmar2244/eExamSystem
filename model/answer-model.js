const mongoose = require('mongoose')

let AnswerSchema = mongoose.Schema({
    answerName:{
        type:String,
    },
    question:{
        type:mongoose.Types.ObjectId,
        ref:"questions"
    }
})

let AnswerModel = mongoose.model("answers",AnswerSchema)

module.exports = AnswerModel