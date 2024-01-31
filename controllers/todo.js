
var todosModel = require('../models/todo')

function getAllTodos() {

  return todosModel.find().populate('userId', "name")

}


function saveTodo(todo) {

  return todosModel.create(todo)
}

// for lab
function getTodoById(id) {

  return todosModel.findOne({ _id: id })

}

function updateTitleTodoById(title, id) {

  return todosModel.findByIdAndUpdate(id, { title: title }, { new: true })
  // todosModel.fineOneAndUpdate({})
}

function getUserTodos(id) {
  return todosModel.find({ userId: id })
}

 function deleteAllTodos() {
  return  todosModel.deleteMany()
}



module.exports = { getAllTodos, saveTodo, getTodoById, updateTitleTodoById, deleteAllTodos, getUserTodos }