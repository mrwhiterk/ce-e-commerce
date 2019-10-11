const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  /** This promise returns the user that is created in db */
  signup: (req, res, next) => {
    let errorValidate = req.validationErrors();

    if (errorValidate) {
      res.render('auth/signup', {
        errors: [],
        errorMessage: true,
        errorValidate: errorValidate
      });

      return;
    }

    User.findOne({ email: req.body.email })
      .then(user => {
        console.log('user: ', user);

        if (user) {
          // if user found return exist error
          req.flash('error', 'User already exist');

          return res.redirect(301, '/api/users/signup');
        } else {
          const newUser = new User();

          newUser.password = req.body.password;
          newUser.email = req.body.email;
          newUser.profile.name = req.body.name;

          // salt the password 10 rounds and store it in newUser.password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) {
                reject(err);
              } else {
                newUser.password = hash;

                // save new user to DB
                newUser
                  .save()
                  .then(user => {
                    req.login(user, err => {
                      if (err) {
                        res.status(400).json({
                          confirmation: false,
                          message: err
                        });
                      } else {
                        res.redirect(301, '/');
                      }
                    });
                  })
                  .catch(err => reject(err));
              }
            });
          });
        }
      })
      .catch(err => {
        throw err;
      });
  },
  /**
   * Logs user into app
   * @param {Object} params - Accepts params containing login info.
   */
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
            bcrypt.compare(params.password, user.password, function(
              err,
              result
            ) {
              if (!result) {
                // no result, send failed message
                let errors = {};
                errors.message = 'Compare failed';
                errors.status = 400;

                reject(errors);
              } else {
                // pass success in the form of valid user
                resolve(user);
              }
            });
          }
        })
        .catch(err => reject(err));
    });
  }
};
