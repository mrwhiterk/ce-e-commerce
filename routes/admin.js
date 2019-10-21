const express = require('express')
const router = express.Router()
const adminValidator = require('../utils/adminChecker')
const adminController = require('../controllers/categoryController')
const productController = require('../controllers/productController')

// localhost:3000/admin
router.get('/', adminController.getCategories)

// localhost:3000/admin/new
router.get('/new', adminController.showAddCategory)

// localhost:3000/admin
router.post('/', adminValidator, adminController.addCategory)

// localhost:3000/admin/seedProducts/:category/:id
router.get('/seedProducts/:category/:id', productController.seedProducts)

module.exports = router
