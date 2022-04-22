const mongoose = require('mongoose')

let QuestionSchema = mongoose.Schema({
    questionName:{
        type:String,
    },
    option1:{
        type:String
    },
    option2:{
        type:String
    },
    option3:{
        type:String
    },
    option4:{
        type:String
    },
    answer:{
        type:String,
        required:true
    },
    marks:{
        type:Number,
        required:true
    }
})


let QuestionModel = mongoose.model('questions',QuestionSchema)

module.exports = QuestionModel