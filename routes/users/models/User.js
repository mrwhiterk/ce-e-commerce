const mongoose = require('mongoose');

const moment = require('moment');

let UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    profile: {
      name: { type: String },
      picture: { type: String }
    },
    address: {
      type: String,
      
    }

    // timestamp: {
    //   type: String,
    //   default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
    // }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
