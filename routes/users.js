const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')
const signupValidation = require('../utils/signupValidation')
const loginValidation = require('../utils/loginValidation')

/* render signup page */
router.get('/signup', userController.isAuthenticated, (req, res) => {
  res.render('auth/signup')
})

/* submit signup form */
router.post('/signup', signupValidation, userController.signup)

/* render login form */
router.get('/login', userController.isAuthenticated, (req, res) => {
  res.render('auth/login')
})

/* submit login form */
router.post('/login', loginValidation, userController.login)

router.get('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})

router.get('/edit', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/')
  res.render('account/profile')
})

router.put('/', userController.findUserAndUpdate)

module.exports = router
