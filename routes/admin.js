const express = require('express')
const router = express.Router()
const adminValidator = require('../utils/adminChecker')
const {
  getCategories,
  showAddCategory,
  addCategory
} = require('../controllers/categoryController')
const { seedProducts } = require('../controllers/productController')

// localhost:3000/admin
router.get('/categories', getCategories)

router.get('/addCategory', showAddCategory)

router.post('/category', adminValidator, addCategory)

router.get('/seedProducts/:category/:id', seedProducts)

module.exports = router
