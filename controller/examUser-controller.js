const ExamUserModel = require('../model/examUser-model')

module.exports.addUserToExam = function(req,res){
    let exam = req.body.exam
    let user = req.body.user
    let examuser = new ExamUserModel({
        exam:exam,
        user:user
    })
    examuser.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"User Added to exam!",status:200,data:data})
        }
    })
}

module.exports.listAllUsersOfExam = function(req,res){
    ExamUserModel.find().populate({path:'exam',populate:{path:'subject'}}).populate('user').exec(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Users of Exam...",status:200,data:data})
        }
    })
}

module.exports.updateExamUser = function(req,res){
    let examUserId = req.body.examUserId
    let exam = req.body.exam
    let user = req.body.user
    ExamUserModel.updateOne({_id:examUserId},{exam:exam,user:user},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong!",status:-1,data:data})
        }
        else{
            res.json({msg:"Exam User Updated!",status:200,data:data})
        }
    })
}

module.exports.deleteUserOfExam = function(req,res){
    let examUserId = req.params.examUserId
    ExamUserModel.deleteOne({"_id":examUserId},function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"User Deleted From Exam!",status:200,data:data})
        }
    })
}