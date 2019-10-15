const express = require('express')
const router = express.Router()
const passport = require('passport')

const userController = require('./controllers/userController')

// const authChecker = require('../../utils/authChecker')

const signupValidation = require('./utils/signupValidation')

/* render signup page */
router.get('/signup', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')

  res.render('auth/signup', {
    errorMessage: null
  })
})

/* submit signup form */
router.post('/signup', signupValidation, userController.signup)

/* render login form */
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) return res.redirect('/')

  res.render('auth/login')
})

/* submit login form */
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/api/users/login',
  failureFlash: true
}))

router.get('/logout', (req, res, next) => {
  req.logOut()

  res.redirect('/')
})

router.get('/edit', (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/')

  res.render('account/profile')
})

module.exports = router
