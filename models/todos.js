const mongoose=require('mongoose')

var todosSchema= mongoose.Schema({

    title:{
        type:String,
        required:true,
        unique:true,
        minLength:4,
        maxLength:25
    }
    ,
    userId:{
      type:mongoose.Types.ObjectId,
      ref:'User',
      required:true,
    }  
})

var todosModel=mongoose.model('Todo', todosSchema)

module.exports=todosModel


