
var userModel = require('../models/user')

function getAllUser() {
    return userModel.find()
}

function saveUser(user) {

    return userModel.create(user)
}
function getUserByEmail(email) {

    return userModel.findOne({ email })

}
function getUserById(id) {

    return userModel.findOne({ _id:id })

}



//lab
function getUserByName(name) {
    return userModel.findOne({ name })

}
function deleteAllUsers() {
    return  userModel.deleteMany()
  }
module.exports = { saveUser, getAllUser, getUserByEmail, getUserByName,deleteAllUsers,getUserById }