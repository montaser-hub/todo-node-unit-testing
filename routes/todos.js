const express = require('express');
var { saveTodo, getTodoById, EditTodoById, getTodos } = require('../controllers/todos')
var { auth } = require('../middlewares/auth')
var router = express.Router()


router.use(auth)

router.get("/", async (req, res) => {
    try {
        var todos = await getTodos()
        if (todos.length > 0) res.status(200).json(todos)
        else res.status(200).json({ message: "Couldn't find any todos" + req.user.userId })
    } catch (e) {
        res.status(400).json(e)
    }
})


router.post("/", async (req, res) => {
    var { title } = req.body
    try {
        if (title) {
            var newTodo = await saveTodo({ title: title, userId: req.user.userId })
            res.status(201).json(newTodo)
        } else {
            res.status(205).json({ message: "must send a title" })
        }
    } catch (e) {
        res.status(400).json(e)
    }
})

router.get("/:id", async (req, res) => {
    var id = req.params.id
    try {
        var foundedTodo = await getTodoById(id)
        res.status(200).json(foundedTodo)
    } catch (e) {
        res.status(404).json(e)
    }


})

// router.patch("/:id",async (req, res) => {
//     var { title } = req.body
//     var { id } = req.params

//     var UpdatedTodo =await EditTodoById(id, title)
//     res.json(UpdatedTodo)
// })

module.exports = router