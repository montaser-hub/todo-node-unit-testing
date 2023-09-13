// const validator=require('validator')

// console.log( validator.isEmail("mona@gmail.com"));


//////////////////////////////////////////////////////////////////////////////


const express = require('express');
// const mongoose=require('mongoose');
const cors=require('cors');
var todoRoutes=require('./routes/todo')
var userRoutes=require('./routes/user')
var todosModel=require('./models/todo')
console.log(process.env.x);


var app = express()
//middleware

app.use(cors({
    origin:'*',
}))
app.use(express.json())

//handling routes
app.use("/user",userRoutes)
app.use('/todo',todoRoutes)

app.get('/',async function(req,res){
    var todos=   await todosModel.find()
    res.status(200).render('todos',{todos})
})


//not found
app.use('*',function(req,res,next){
  res.status(404).json({message:'NOT FOUND'})
})

//error handling
app.use(function(err,req,res,next){
 
    res.status(500).json({message:'Something went wrong !'})

})

//custom middleware
app.use(function(req,res,next){

   console.log(req.body);
    next();

})


// mongoose.connect("mongodb://127.0.0.1:27017/todoDB").then(()=>{
//     console.log("connected to db successfully")
// }).catch((err)=>{
//     console.log(err);
// })

require("./db.connection")

var port = 3333
app.listen(port, () => {
    console.log(`server listening successfully on port ${port}`);
})


module.exports= app

//cors

//www.example.com             ex.www.example.com