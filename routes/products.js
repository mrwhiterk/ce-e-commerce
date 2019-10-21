const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// localhost:3000/products
router.get('/', productController.getProducts)

// localhost:3000/products/5dade015de2cc7199c92291f
router.get('/:id', productController.getProductById)

// localhost:3000/products/findByCategory/5da895db6b3bfc5f9a2d7c10
router.get('/findByCategory/:id', productController.getProductsByCategoryId)

module.exports = router
