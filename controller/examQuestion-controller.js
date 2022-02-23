const ExamQuestionModel = require('../model/examQuestion-model')

module.exports.addQuestiontoExam = function(req,res){
    let exam = req.body.exam
    let question = req.body.question
    let examQuestion = new ExamQuestionModel({
        exam:exam,
        question:question
    })
    examQuestion.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Question Added to Exam!",status:200,data:data})
        }
    })
}

module.exports.listAllQuestionOfExam = function(req,res){
    ExamQuestionModel.find().populate({path:'exam',populate:{path:'subject'}}).populate('question').exec(function(err,data){
        if(err){
            res.json({msg:"SMW",status:-1,data:err})
        }
        else{
            res.json({msg:"Questions of Exam...",status:200,data:data})
        }
    })
}

module.exports.updateExamQuestion = function(req,res){
    let examQuestionId = req.body.examQuestionId
    let exam = exam
    let question = question
    ExamQuestionModel.updateOne({_id:examQuestionId},{exam:exam,question:question},function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Question of Exam Updated!",status:200,data:data})
        }
    })
}

module.exports.deleteExamQuestion = function(req,res){
    let examQuestionId = req.params.examQuestionId
    ExamQuestionModel.deleteOne({"_id":examQuestionId},function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Exam Question Deleted!",status:200,data:data})
        }
    })
}