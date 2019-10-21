const express = require('express')
const router = express.Router()
const adminValidator = require('../utils/adminChecker')
const adminController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

// localhost:3000/admin
router.get('/', adminController.getCategories)

router.get('/new', adminController.showAddCategory)

router.post('/', adminValidator, adminController.addCategory)

router.get('/seedProducts/:category/:id', productController.seedProducts)

module.exports = router
