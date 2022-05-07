const QuestionModel = require('../model/question-model')
const ExamModel = require('../model/exam-model')

// module.exports.addQuestion = function(req,res){
//     let questionName = req.body.questionName
//     let option1 = req.body.option1
//     let option2 = req.body.option2
//     let option3 = req.body.option3
//     let option4 = req.body.option4
//     let answer = req.body.answer
//     let question = new QuestionModel({
//         questionName:questionName,
//         option1:option1,
//         option2:option2,
//         option3:option3,
//         option4:option4,
//         answer:answer
//     })
//     question.save(function(err,data){
//         if(err){
//             res.json({msg:"Something Wrong!",status:-1,data:req.body})
//         }
//         else{
//             res.json({msg:"Question Added!",status:200,data:data})
//         }
//     })
// }



module.exports.addQuestiontoExam = function(req,res){
    var examId = req.params.examId
    var exam = ExamModel.findById(req.params.examId);
    // var totalQuestionsRemaining = 
    // console.log(totalQuestionsAdded);
    var question = new QuestionModel({
        questionName:req.body.questionName,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
        answer:req.body.answer,
        marks:req.body.marks
    });
    exam.findOneAndUpdate({_id:examId},{$push:{questions:question}},function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong!",status:-1,data:data})
        }
        else{
                res.json({msg:"Question Added to exam",status:200,data:data})
        }
    })
    question.save();
};

module.exports.listOneQuestion = function(req,res){
    // let examId = req.params.examId
    let questionId = req.params.questionId
    QuestionModel.findById(questionId,function(err,data){
        if(err){
            res.json({msg:"SWW",status:-1,data:req.body})
        }
        else{
            res.json({msg:"One Question...",status:200,data:data})
        }
    })
}

module.exports.listAllQuestionsOfExam = function(req,res){
    var examId = req.params.examId
    ExamModel.findById(examId,function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Questions...",status:200,data:data})
        }
    })
}

module.exports.updateQuestion = function(req,res){
    let questionId = req.params.questionId
    let questionName = req.body.questionName
    let option1 = req.body.option1
    let option2 = req.body.option2
    let option3 = req.body.option3
    let option4 = req.body.option4
    let answer = req.body.answer
    let marks = req.body.marks
    QuestionModel.findByIdAndUpdate(questionId,{questionName:questionName,option1:option1,option2:option2,option3:option3,option4:option4,answer:answer,marks:marks},
        function(err,data){
            if(err){
                res.json({msg:"Something Wrong!",status:-1,data:req.body})
            }
            else{
                res.json({msg:"Question Updated!",status:200,data:data})
            }
        })
}

module.exports.deleteQuestion = async function(req,res){
    let examId = req.params.examId
    let questionId = req.params.questionId
    await ExamModel.findByIdAndUpdate(examId,{$pull:{questions:questionId}})
    QuestionModel.findByIdAndDelete({"_id":questionId}).then((err)=>{
            res.json({msg:"Something Went Wrong!",status:-1,data:err})
    }).catch((data)=>{
        res.json({msg:"Question Deleted!",status:200,data:data})
    })
}
