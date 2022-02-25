const ResultModel = require('../model/result-model')

module.exports.addResult = function(req,res){
    let marks = req.body.marks
    let exam = req.body.exam
    let user = req.body.user
    // let examDate = req.body.examDate
    let result = new ResultModel({
        marks:marks,
        exam:exam,
        user:user
    })
    result.save(function(err,data){
        if(err){
            res.json({msg:"SWW",status:-1,data:err})
        }
        else{
            res.json({msg:"Result Added!",status:200,data:data})
        }
    })
}

module.exports.listAllResult = function(req,res){
    ResultModel.find().populate('exam').populate('user').exec(function(err,data){
        if(err){
            res.json({msg:"sww",status:-1,data:err})
        }
        else{
            res.json({msg:"results...",status:200,data:data})
        }
    })
}

module.exports.updateResult = function(req,res){
    let resultId = req.body.resultId
    let marks = req.body.marks
    ResultModel.updateOne({_id:resultId,marks:marks},function(err,data){
        if(err){
            res.json({msg:"sww",status:-1,data:err})
        }
        else{
            res.json({msg:"Result Updated!",status:200,data:data})
        }
    })
}

module.exports.deleteResult = function(req,res){
    let resultId = req.params.resultId
    ResultModel.deleteOne({"_id":resultId},function(err,data){
        if(err){
            res.json({msg:"sww",status:-1,data:err})
        }
        else{
            res.json({msg:"Result Deleted!",status:200,data:data})
        }
    })
}