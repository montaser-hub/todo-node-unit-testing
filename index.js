
const express = require("express")
const cors=require("cors")
const mongoose=require("mongoose")
var todosRoutes=require('./routes/todos')
var usersRoutes=require('./routes/users')
const app = express()
mongoose.connect("mongodb://127.0.0.1:27017/itiMearn")
.then(()=>console.log("db connected..."))
.catch(err=>console.log(err))

//middleware
app.use(express.json())
//cors
app.use(cors())

//custom middleware
// app.use((req, res, next) => {

//     console.log("request");
//     next()


// })

//routes
app.use('/todos', todosRoutes)
app.use("/users", usersRoutes)



app.listen(3000, () => {

    console.log("server started listening successfully");
})



module.exports= app









