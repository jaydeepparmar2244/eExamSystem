const ExamModel = require('../model/exam-model')
const SubjectModel = require('../model/subject-model')

module.exports.addExam = function(req,res){
    let examName = req.body.examName
    let author = req.body.author
    let totalMarks = req.body.totalMarks
    let totalQuestions = req.body.totalQuestions
    let isActive = req.body.isActive
    let subject = req.body.subject
    let examTime = req.body.examTime
    let exam = new ExamModel({
        examName:examName,
        totalQuestions:totalQuestions,
        isActive:isActive,
        totalMarks:totalMarks,
        subject:subject,
        author:author,
        examTime:examTime
    })
    exam.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Exam Added",status:200,data:data})
        }
    })
}

module.exports.listAllExam = function(req,res){
    ExamModel.find().populate('subject').populate('author').exec(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Exams...",status:200,data:data})
        }
    })
}

module.exports.listOneExam = function(req,res){
    let examId = req.params.examId
    ExamModel.findById(examId).populate('subject').populate('author').populate('questions').exec(function(err,data){
        if(err){
            res.json({msg:"SMW",status:-1,data:err})
        }
        else{
            res.json({msg:"One Exam",status:200,data:data})
        }
    })
}

module.exports.updateExam = function(req,res){
    let examId = req.params.examId
    let examName = req.body.examName
    let totalMarks =  req.body.totalMarks
    let totalQuestions = req.body.totalQuestions
    let isActive = req.body.isActive
    let subject = req.body.subject
    let examTime = req.body.examTime
    ExamModel.findByIdAndUpdate(examId,{examName:examName,totalQuestions:totalQuestions,totalMarks:totalMarks,isActive:isActive,subject:subject,examTime:examTime},function(err,data){
        if(err){
            res.json({msg:"SWW",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Exam Updated",status:200,data:data})
        }
    })
}

module.exports.deleteExam = function(req,res){
    let examId = req.params.examId
    ExamModel.deleteOne({"_id":examId},function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Exam Deleted!",status:200,data:data})
        }
    })
}

module.exports.listAllExamsOfSubject = function(req,res){
    let subjectId = req.params.subjectId
    let subject = SubjectModel.findById(subjectId)
    ExamModel.find({subject:{_id:subjectId}},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Exams of Subject",status:200,data:data})
        }
    })
}

module.exports.searchExams = function(req,res){
    let examName = req.query.examName
    ExamModel.findOne({examName:examName},function(err,data){
        if(err){
            res.json({msg:"Not Found!",status:-1,data:data})
        }
        else{
            res.json({msg:"Exam Found!",status:200,data:data})
        }
    })
}