const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var usersModel = require('../models/user')
var router = express.Router()




//get all uses

router.get("/", (req, res) => {

    res.status(200).json({ data: "all users" })
})

//get user by id

router.get("/:id", (req, res) => {

    res.status(200).json({ message: "here's your user" })
})

router.post('/signup', async (req, res) => {
    var user = req.body
    try {
        var newUser = await usersModel.create(user)
        res.status(201).json({ data: newUser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})


router.post('/login', async function (req, res) {
   

    var { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: 'please provide email and password' })
    }

    try {

        var user = await usersModel.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }
        var isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

     var token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET)


      res.status(200).json({ token, status: "success" })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }


})



module.exports = router