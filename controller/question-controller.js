const QuestionModel = require('../model/question-model')

module.exports.addQuestion = function(req,res){
    let questionName = req.body.questionName
    let option1 = req.body.option1
    let option2 = req.body.option2
    let option3 = req.body.option3
    let option4 = req.body.option4
    let answer = req.body.answer
    let question = new QuestionModel({
        questionName:questionName,
        option1:option1,
        option2:option2,
        option3:option3,
        option4:option4,
        answer:answer
    })
    question.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Question Added!",status:200,data:data})
        }
    })
}

module.exports.listAllQuestion = function(req,res){
    QuestionModel.find(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Questions...",status:200,data:data})
        }
    })
}

module.exports.updateQuestion = function(req,res){
    let questionId = req.body.questionId
    let questionName = req.body.questionName
    let option1 = req.body.option1
    let option2 = req.body.option2
    let option3 = req.body.option3
    let option4 = req.body.option4
    let answer = req.body.answer
    QuestionModel.updateOne({_id:questionId},
        {questionName:questionName,option1:option1,option2:option2,option3:option3,option4:option4,answer:answer},
        function(err,data){
            if(err){
                res.json({msg:"Something Wrong!",status:-1,data:req.body})
            }
            else{
                res.json({msg:"Question Updated!",status:200,data:data})
            }
        })
}

module.exports.deleteQuestion = function(req,res){
    let questionId = req.params.questionId
    QuestionModel.deleteOne({"_id":questionId},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Question Deleted!",status:200,data:data})
        }
    })
}