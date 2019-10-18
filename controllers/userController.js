const User = require('../models/User')
const bcrypt = require('bcryptjs')
const hasher = require('../utils/hasher')
const gravatar = require('../utils/gravatar')

exports.signup = (req, res) => {
  const errorValidate = req.validationErrors()
  if (errorValidate) {
    req.flash('errors', errorValidate)
    res.redirect('/users/signup')
    return
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // if user found return exist error
        req.flash('errors', 'User already exist')
        return res.redirect(301, '/users/signup')
      } else {
        const newUser = new User()
        newUser.password = req.body.password
        newUser.email = req.body.email
        newUser.profile.name = req.body.name
        newUser.profile.picture = gravatar(newUser.email)
        // salt the password 10 rounds and store it in newUser.password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err)
            } else {
              newUser.password = hash

              // save new user to DB
              newUser
                .save()
                .then(user => {
                  req.login(user, err => {
                    if (err) {
                      res.status(400).json({
                        confirmation: false,
                        message: err
                      })
                    } else {
                      res.redirect(301, '/')
                    }
                  })
                })
                .catch(err => console.log(err))
            }
          })
        })
      }
    })
    .catch(err => {
      throw err
    })
}

exports.login = params => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: params.email })
      .then(user => {
        if (!user) {
          const errors = {}
          errors.message = 'Invalid Username or Password'
          errors.status = 400

          reject(errors)
        } else {
          bcrypt.compare(params.password, user.password, (err, result) => {
            if (err) throw err

            if (!result) {
              // no result, send failed message
              const errors = {}
              errors.message = 'Invalid Username or Password'
              errors.status = 400

              reject(errors)
            } else {
              // pass success in the form of valid user
              resolve(user)
            }
          })
        }
      })
      .catch(err => reject(err))
  })
}

exports.findUserAndUpdate = async (req, res) => {
  req.user.email = req.body.email || req.user.email
  req.user.profile.name = req.body.name || req.user.profile.name
  req.user.address = req.body.address || req.user.address

  // start

  let oldPasswordMatches = false
  try {
    oldPasswordMatches = await bcrypt.compare(
      req.body.oldPassword,
      req.user.password
    )
  } catch (err) {
    req.flash('errors', err)
  }

  if (
    oldPasswordMatches &&
    req.body.password[0].length > 0 &&
    req.body.password[0] === req.body.password[1]
  ) {
    const oldPassword = req.user.password
    req.user.password = (await hasher(req.body.password[0])) || oldPassword
    if (req.user.password !== oldPassword) {
      req.flash('success', 'successfully updated user password')
    }
  } else {
    req.flash('errors', 'Invalid password: not updated')
  }

  // end

  req.user.save((err, updatedUser) => {
    if (err) {
      req.flash('errors', err)
    } else {
      req.flash('success', 'successfully updated ' + updatedUser.profile.name)
    }
    res.redirect('/users/edit')
  })
}

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/')

  next()
}
