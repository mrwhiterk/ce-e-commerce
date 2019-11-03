const express = require('express')
const router = express.Router()
const adminValidator = require('../utils/adminChecker')
const {
  getCategories,
  showAddCategory,
  addCategory
} = require('../controllers/categoryController')
const {
  seedProducts,
  showEditForm,
  editProduct
} = require('../controllers/productController')

// localhost:3000/admin
router.get('/categories', getCategories)

router.get('/addCategory', showAddCategory)

router.get('/products/:id/edit', showEditForm)

router.get('/adminMode', (req, res) => {
  req.flash('admin', 'enabled')
  req.flash('success', 'admin mode enabled')
  res.redirect('back')
})

router.put('/products/:id', editProduct)

router.post('/category', adminValidator, addCategory)

router.get('/seedProducts/:category/:id', seedProducts)

module.exports = router
