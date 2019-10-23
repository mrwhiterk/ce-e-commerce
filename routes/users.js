const express = require('express')
const router = express.Router()
const {
  isAuthenticated: redirectIfAuthenticated,
  showSignup,
  signup,
  showLogin,
  passportLogin,
  logout,
  showEditUser,
  findUserAndUpdate
} = require('../controllers/userController')
const signupValidation = require('../utils/signupValidation')
const loginValidation = require('../utils/loginValidation')

// localhost:3000/users/
router.get('/signup', redirectIfAuthenticated, showSignup)

router.post('/signup', signupValidation, signup)

router.get('/login', redirectIfAuthenticated, showLogin)

router.post('/login', loginValidation, passportLogin)

router.get('/logout', logout)

router.get('/edit', showEditUser)

router.put('/', findUserAndUpdate)

module.exports = router
