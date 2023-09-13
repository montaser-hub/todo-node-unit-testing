
var todosModel=require('../models/todo')

function getAllTodos(){
   
   return  todosModel.find().populate('userId',"name")
    
  }


function saveTodo(todo){

 return todosModel.create(todo)
}

// for lab
function getTodoById(id){
     
 return todosModel.findOne({_id:id})

}

function updateTodoById(title,id){
    
   return todosModel.findByIdAndUpdate(id,{title:title},{new:true})
  // todosModel.fineOneAndUpdate({})
}

async function deleteAllTodos() {
return await todosModel.deleteMany()
}
module.exports={getAllTodos,saveTodo,getTodoById,updateTodoById,deleteAllTodos}