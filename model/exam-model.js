const mongoose = require('mongoose')

let ExamSchema = mongoose.Schema({
    examName:{
        type:String,
    },
    totalQuestions:{
        type:Number
    },
    isActive:{
        type:Boolean
    },
    subject:{
        type:mongoose.Types.ObjectId,
        ref:"subjects"
    }
})

let ExamModel = mongoose.model('exams',ExamSchema)

module.exports = ExamModel