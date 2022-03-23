const { find } = require('../model/answer-model')
const AnswerModel = require('../model/answer-model')

module.exports.addAnswer = function(req,res){
    let answerName = req.body.answerName
    let question = req.body.question
    let answer = new AnswerModel({
        answerName:answerName,
        question:question
    })
    answer.save(function(err,data){
        if(err){
            res.json({msg:"SMW",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Answer Added!",status:200,data:data})
        }
    })
}

module.exports.listAllAnswer = function(req,res){
    AnswerModel.find().populate('question').exec(function(err,data){
        if(err){
            res.json({msg:"SMW",status:-1,data:err})
        }
        else{
            res.json({msg:"answers...",status:200,data:data})
        }
    })
}

module.exports.listOneAnswer = function(req,res){
    let answerId = req.params.answerId
    AnswerModel.findById(answerId).populate('question').exec(function(err,data){
        if(err){
            res.json({msg:"SWW",status:-1,data:req.body})
        }
        else{
            res.json({msg:"One Answer...",status:200,data:data})
        }
    })
}