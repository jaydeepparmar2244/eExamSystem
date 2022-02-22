const express = require('express')
// const path = require('path')
const app = express()
const sessionController = require('./controller/session-controller')
const roleController = require('./controller/role-controller')
const userController = require('./controller/user-controller')
const subjectController = require('./controller/subject-controller')
const mongoose = require('mongoose');
const questionController = require('./controller/question-controller')


//middleware
app.use(express.json()) //accepts json data from req and set data into body 
app.use(express.urlencoded({extended:true})) // web--> accept url encoded data from request and set data into body

//database connection
mongoose.connect('mongodb://localhost:27017/eExam',function(err){
    if(err){
        console.log("Database not Connected!")
        console.log(err)
    }
    else{
        console.log("Database Connected!")
    }
});

app.get('/',function(req,res){
    res.write('Hello!')
    // res.write('Hey')
    res.end()
})

// app.get('/signup',function(req,res){
//     // res.write('Helooooooooo')
//     res.sendFile('/views/signup.htm')
//     res.end()
// })

app.get('/signup',sessionController.signup)
app.get('/login',sessionController.login)

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
app.delete('/users/:userId',userController.deleteUser)
app.put('/users',userController.updateUser)
app.post('/login',userController.login)

//subject
app.post('/subjects',subjectController.addSubject)
app.get('/subjects',subjectController.listAllSubject)
app.put('/subjects',subjectController.updateSubject)
app.delete('/subjects/:subjectId',subjectController.deleteSubject)

//question
app.post('/questions',questionController.addQuestion)
app.get('/questions',questionController.listAllQuestion)
app.put('/questions',questionController.updateQuestion)
app.delete('/questions/:questionId',questionController.deleteQuestion)


app.listen('3000',function(req,res){
    console.log('Server Started On 3000 Port!')
})