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
    totalMarks:{
        type:Number
    },
    examTime:{
        type:Number
    },
    subject:{
        type:mongoose.Types.ObjectId,
        ref:"subjects"
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    questions:[
        {
            type:mongoose.Types.ObjectId,
            ref:"questions"
        }
    ]
})

let ExamModel = mongoose.model('exams',ExamSchema)

module.exports = ExamModel