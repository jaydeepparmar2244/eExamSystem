const mongoose = require('mongoose')

let ExamQuestionSchema = mongoose.Schema({
    exam:{
        type:mongoose.Types.ObjectId,
        ref:"exams"
    },
    question:{
        type:mongoose.Types.ObjectId,
        ref:"questions"
    }
})

let ExamQuestionModel = mongoose.model('examQuestions',ExamQuestionSchema)

module.exports = ExamQuestionModel