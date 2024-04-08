const express = require('express')
// const path = require('path')
const app = express()
const dotenv = require('dotenv').config()
const sessionController = require('./controller/session-controller')
const roleController = require('./controller/role-controller')
const userController = require('./controller/user-controller')
const subjectController = require('./controller/subject-controller')
const mongoose = require('mongoose');
const questionController = require('./controller/question-controller')
const examController = require('./controller/exam-controller')
const answerController = require('./controller/answer-controller')
const resultController = require('./controller/result-controller')
const cors = require('cors')

//middleware
app.use(express.json()) //accepts json data from req and set data into body 
app.use(express.urlencoded({extended:true})) // web--> accept url encoded data from request and set data into body
app.use(cors())

//database connection
mongoose.connect('mongodb+srv://jaydeep224467:JDparmar%402244@eexam.3qlb6zp.mongodb.net/?retryWrites=true&w=majority&appName=eExam',function(err){
    if(err){
        console.log("Database not Connected!")
        console.log(err)
    }
    else{
        console.log("Database Connected!")
    }
});


// app.get('/signup',function(req,res){
//     // res.write('Helooooooooo')
//     res.sendFile('/views/signup.htm')
//     res.end()
// })


app.get('/signup',sessionController.signup)
app.post('/forgotPassword',sessionController.mailLinkToResetPassword)
app.post('/reset',sessionController.resetPassword)
// app.get('/login',sessionController.login)

// app.get('/login',function(req,res){
//     res.write('Login')
//     res.end()
// })

app.post('/saveuser',sessionController.saveuser)
//role

app.post('/roles',roleController.addRole)
app.get('/roles',roleController.listAllRole)
app.delete('/roles/:roleId',roleController.deleteRole)
app.put('/roles',roleController.updateRole)

//user
app.post('/users',userController.addUser)
app.get('/users',userController.listAllUser)
app.get('/users/:userId',userController.listOneUser)
app.delete('/users/:userId',userController.deleteUser)
app.put('/users/:userId',userController.updateUser)
app.post('/login',userController.login)
app.get('/user/:userId/exams',examController.listExamsofAuthor)
//hello
//subject
app.post('/subjects',subjectController.addSubject)
app.get('/subjects',subjectController.listAllSubject)
app.get('/subjects/:subjectId',subjectController.listOneSubject)
app.put('/subjects/:subjectId',subjectController.updateSubject)
app.delete('/subjects/:subjectId',subjectController.deleteSubject)
app.get('/subjects/:subjectId/exams',examController.listAllExamsOfSubject)
//question
// app.post('/questions',questionController.addQuestion)
app.post('/exams/:examId/questions',questionController.addQuestiontoExam)
app.get('/exams/:examId/questions',questionController.listAllQuestionsOfExam)
app.get('/exams/:examId/questions/:questionId',questionController.listOneQuestion)
app.put('/exams/:examId/questions/:questionId',questionController.updateQuestion)
app.delete('/exams/:examId/questions/:questionId',questionController.deleteQuestion)

//exam
app.get('/exams/search',examController.searchExams)
app.post('/exams',examController.addExam)
app.get('/exams',examController.listAllExam)
app.get('/exams/:examId',examController.listOneExam)
app.put('/exams/:examId',examController.updateExam)
app.delete('/exams/:examId',examController.deleteExam)

//answers
app.post('/answers',answerController.addAnswer)
app.get('/answers',answerController.listAllAnswer)
app.get('/answers/:answerId',answerController.listOneAnswer)

//results
app.post('/results',resultController.addResult)
app.put('/results/:resultId',resultController.updateResult)
app.get('/result/:resultId',resultController.listOneResult)
app.get('/results',resultController.listAllResult)
app.delete('/results/:resultId',resultController.deleteResult)
app.get('/results/:userId',resultController.listAllResultsOfUser)

app.listen(process.env.PORT,function(req,res){
    console.log('Server Started On 8080 Port!')
})
