const express = require('express')
const router = express.Router()
const adminValidator = require('../utils/adminChecker')
const adminController = require('../controllers/adminController')

router.get('/', adminController.getCategories)

router.get('/new', (req, res) => {
  res.render('products/addCategory')
})

router.post('/', adminValidator, adminController.addCategory)

module.exports = router
