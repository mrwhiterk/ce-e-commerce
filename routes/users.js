const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const signupValidation = require('../utils/signupValidation')
const loginValidation = require('../utils/loginValidation')

// localhost:3000/users/
router.get('/signup', userController.isAuthenticated, userController.showSignup)

router.post('/signup', signupValidation, userController.signup)

router.get('/login', userController.isAuthenticated, userController.showLogin)

router.post('/login', loginValidation, userController.passportLogin)

router.get('/logout', userController.logout)

router.get('/edit', userController.showEditUser)

router.put('/', userController.findUserAndUpdate)

module.exports = router
