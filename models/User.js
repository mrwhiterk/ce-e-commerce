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
      required: [true, 'password is required'],
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

module.exports = mongoose.model('User', UserSchema)
