const SubjectModel= require('../model/subject-model')

module.exports.addSubject = function(req,res){
    let subjectName = req.body.subjectName
    let subjectDescription = req.body.subjectDescription
    let isActive = req.body.isActive
    let subject = new SubjectModel({
        subjectName: subjectName,
        subjectDescription:subjectDescription,
        isActive:isActive
    })
    subject.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Subject Added!",status:200,data:data})
        }
    })
}

module.exports.listAllSubject = function(req,res){
    SubjectModel.find(function(err,data){
        if(err){
            res.json({msg:"Something Went Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Subjects...",status:200,data:data})
        }
    })
}

module.exports.updateSubject = function(req,res){
    let subjectId = req.body.subjectId
    let subjectName = req.body.subjectName
    let subjectDescription = req.body.subjectDescription
    SubjectModel.updateOne(
        {_id:subjectId},
        {subjectName:subjectName,subjectDescription:subjectDescription},
        function(err,data){
            if(err){
                res.json({msg:"Something Wrong!",status:-1,data:req.body})
            }
            else{
                res.json({msg:"Subject Updated!",status:200,data:data})
            }
        })
}

module.exports.deleteSubject = function(req,res){
    let subjectId = req.params.subjectId
    SubjectModel.deleteOne({"_id":subjectId},function(err,data){
        if(err){
            res.json({msg:"Something Wrong!",status:-1,data:err})
        }
        else{
            res.json({msg:"Subject Deleted!",status:200,data:data})
        }
    })
}