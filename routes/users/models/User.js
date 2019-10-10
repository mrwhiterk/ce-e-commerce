const mongoose = require('mongoose');

const moment = require('moment');

let UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      minlength: [5, 'email must be atleast 5 characters'],
      maxlength: 50
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [5, 'password must be atleast 5 characters']
    },
    profile: {
      name: { type: String },
      picture: { type: String }
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
