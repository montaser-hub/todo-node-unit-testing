const express = require('express')
var { saveUser, getAllUsers, login } = require('../controllers/users')
var router = express.Router()

router.get("/", async (req, res) => {
    try {
        var users = await getAllUsers()
        if (users.length > 0) res.status(200).json(users)
        else {
            res.status(400).json({ message: "There is no users yet" })
        }
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})

router.post("/", async (req, res) => {
    var user = req.body
    try {
        var newUser = await saveUser(user)
        newUser && res.status(201).json(newUser)
        !newUser && res.status(200).json({ message: "Couldn't create user" })
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
})



router.post('/login',login)

module.exports = router