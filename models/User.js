const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      maxlength: 50
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    profile: {
      name: { type: String },
      picture: { type: String, default: '' }
    },
    address: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
)

UserSchema.statics.findByEmail = function (email) {
  return this.find({ email: new RegExp(email, 'i') })
}

UserSchema.static('listUsersByName', async function () {
  let userList = []
  await this.find((err, users) => {
    if (err) return console.err(err)

    userList = users.map(item => {
      return item.profile.name
    })
  })

  return userList
})

module.exports = mongoose.model('User', UserSchema)
