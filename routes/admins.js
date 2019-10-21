const express = require('express')
const router = express.Router()
const adminValidator = require('../utils/adminChecker')
const adminController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

router.get('/', adminController.getCategories)

router.get('/new', (req, res) => {
  res.render('products/addCategory')
})

router.post('/', adminValidator, adminController.addCategory)

// router.get('/create-fake-product/:category/:id', productController.createById)

module.exports = router
