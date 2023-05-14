const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');


var usersSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 15
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 25,
    // validate: {
    //     validator: function(v) {
    //       return /^[a-zA-Z]{1,5}[0-9]{1,6}$/.test(v);
    //     },
    //     message: props => `${props.value} is not a valid password!`
    //   }
  }
})


usersSchema.pre('save', function (next) {

  // console.log(this)
  // this.password 
  var salt = bcrypt.genSaltSync(10);

  var hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword

  next()

})

var usersModel = mongoose.model('User', usersSchema)

module.exports = usersModel