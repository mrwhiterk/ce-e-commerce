const express = require('express')
const router = express.Router()
const User = require('../models/User')
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

router.get('/findUserByEmail/:email', async (req, res) => {
  // created a static method on User model to find user by email
  const user = await User.findByEmail(req.params.email)
  res.json(user)
})

router.get('/listUsersByName', async (req, res) => {
  const userList = await User.listUsersByName()
  res.json(userList)
})

module.exports = router
