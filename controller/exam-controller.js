const ExamModel = require('../model/exam-model')

module.exports.addExam = function(req,res){
    let examName = req.body.examName
    let totalQuestions = req.body.totalQuestions
    let isActive = req.body.isActive
    let subject = req.body.subject
    let exam = new ExamModel({
        examName:examName,
        totalQuestions:totalQuestions,
        isActive:isActive,
        subject:subject
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
    ExamModel.find().populate('subject').exec(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Exams...",status:200,data:data})
        }
    })
}

module.exports.updateExam = function(req,res){
    let examId = req.body.examId
    let examName = req.body.examName
    let totalQuestions = req.body.totalQuestions
    let isActive = req.body.isActive
    let role = req.body.role
    ExamModel.updateOne({_id:examId},{examName:examName,totalQuestions:totalQuestions,isActive:isActive,role:role},
        function(err,data){
            if(err){
                res.json({msg:"Something Wrong!",status:-1,data:req.body})
            }
            else{
                res.json({msg:"Exam Added!",status:200,data:data})
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