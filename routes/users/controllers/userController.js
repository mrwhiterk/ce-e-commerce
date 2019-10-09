const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {

  /** This promise returns the user that is created in db. */
  signup: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          if (user) {
            let errors = {};
            errors.message = 'Email exists';
            errors.status = 400;

            reject(errors);
          } else {
            const newUser = new User();
            
            newUser.password = params.password;
            newUser.email = params.email;

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  reject(err);
                } else {
                  newUser.password = hash;

                  newUser
                    .save()
                    .then(user => resolve(user))
                    .catch(err => reject(err));
                }
              });
            });
          }
        })
        .catch(err => reject(err));
    });
  },

  login: params => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: params.email })
        .then(user => {
          if (!user) {
            let errors = {};
            errors.message = 'User is not found';
            errors.status = 400;

            reject(errors);
          } else {
            
            bcrypt.compare(params.password, user.password, function(err, r) {

              if (!r) {
                let errors = {};
                errors.message = 'Compare failed';
                errors.status = 400;

                reject(errors);
              } else {
                resolve(user);
              }
            });
            
          }
        })
        .catch(err => reject(err));
    })
  }
};
