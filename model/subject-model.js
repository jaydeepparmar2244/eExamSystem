const mongoose = require('mongoose')

let SubjectSchema = mongoose.Schema({
    subjectName:{
        type: String,
        required: true
    },
    subjectDescription:{
        type:String,

    },
    isActive:{
        type:Boolean,
        required:true
    }
})

let SubjectModel = mongoose.model('subjects',SubjectSchema)

module.exports = SubjectModel