const mongoose = require('mongoose')

let ResultSchema = mongoose.Schema({
    exam:{
        type:mongoose.Types.ObjectId,
        ref:"exams"
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    marks:{
        type:Number
    },
    // examDate:{
    //     type:Date
    // }
})

const ResultModel = mongoose.model('results',ResultSchema)

module.exports = ResultModel