const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  signup: (params) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then()
        .catch()
    })
  }
}