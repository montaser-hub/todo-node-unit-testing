
const express=require('express')
var router=express.Router()
var {getAllTodos,saveTodo,getTodoById,updateTodoById}=require('../controllers/todo')
var auth=require('../middlewares/auth')

// router.use(auth)

//get all todos
router.get("/", async(req, res) => {
        
    try{
        var todos =await getAllTodos()
        res.status(200).json({ data: todos });
    }catch(err){
        res.status(500).json({message:"Couldn't find todos try again"})
    }   

})

//save todo
router.post("/",auth,async (req, res) => {
    var title = req.body.title //{title:"new todo"}
    //  console.log(todo);

    try{

        var newTodo=  await saveTodo({title:title,userId:req.id})
        res.status(201).json({ data: newTodo })
    }catch(err){
        res.status(500).json({message: err.message})
    }
  

   

})


//get todo by id
router.get("/:id",auth,async (req, res) => {
    var { id } = req.params

    try{
        var todo=await getTodoById(id)
        if (todo) {
            res.status(200).json({ data: todo })
        } else {
            res.status(404).json({ message: "todo not found" })
        }
    }catch(err){
          res.status(500).json({message:err.message})
    }
 


})


//update todo by id
router.patch("/:id",auth,async(req,res)=>{
    var {title} = req.body;
    var {id}=req.params
   var updatedTodo=await updateTodoById(title,id)
    res.status(200).json({data:updatedTodo})

})

//delete by id


module.exports=router