const User = require('../models/User')
const bcrypt = require('bcryptjs')
const hasher = require('../utils/hasher')
const gravatar = require('../utils/gravatar')
const passport = require('passport')

exports.showSignup = (req, res) => {
  res.render('auth/signup')
}

exports.showLogin = (req, res) => {
  res.render('auth/login')
}

exports.passportLogin = passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
})

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
// not in use -> callback version
exports.login = (req, res) => {
  const refuse = () => res.redirect('/users/login')
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      req.flash('errors', err)
      refuse()
    } else {
      if (!user) {
        req.flash('errors', 'user does not exist')
        refuse()
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            req.flash('errors', err)
            refuse()
          } else {
            if (!result) {
              req.flash('errors', 'passwords do not match')
              refuse()
            } else {
              req.login(user, err => {
                if (err) {
                  req.flash('errors', err)
                  refuse()
                } else {
                  req.flash('success', 'Welcome back ' + req.user.profile.name)
                  res.redirect('/')
                }
              })
            }
          }
        })
      }
    }
  })
}

// not in use -> async/await version
exports.login2 = async (req, res) => {
  const refuse = () => res.redirect('/users/login')

  try {
    var user = await User.findOne({ email: req.body.email })
  } catch (err) {
    req.flash('errors', err)
    return refuse()
  }

  // if user is false (no user found)
  if (!user) {
    req.flash('errors', 'user does not exist')
    return refuse()
  }

  try {
    var passwordMatches = await bcrypt.compare(req.body.password, user.password)
  } catch (err) {
    req.flash('errors', err)
    return refuse()
  }

  if (!passwordMatches) {
    req.flash('errors', 'passwords do not match')
    return refuse()
  }

  req.login(user, err => {
    if (err) {
      req.flash('errors', 'internal login err')
      refuse()
    } else {
      req.flash('success', 'Welcome back ' + req.user.profile.name)
      res.redirect('/')
    }
  })
}

exports.findUserAndUpdate = async (req, res) => {
  req.user.email = req.body.email || req.user.email
  req.user.profile.name = req.body.name || req.user.profile.name
  req.user.address = req.body.address || req.user.address

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
    req.body.password[0] &&
    req.body.password[0] === req.body.password[1]
  ) {
    const oldPassword = req.user.password
    req.user.password = (await hasher(req.body.password[0])) || oldPassword

    if (req.body.password[0] !== req.body.oldPassword) {
      req.flash('success', 'successfully updated user password')
    }
  } else {
    req.flash('errors', 'password not updated')
  }

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

exports.showEditUser = (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/')
  res.render('account/profile')
}

exports.logout = (req, res) => {
  req.logOut()
  res.redirect('/')
}
