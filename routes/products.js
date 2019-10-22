const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// localhost:3000/products/
router.get('/', productController.getProducts)

router.get('/:id', productController.getProductById)

router.get('/findByCategory/:id', productController.getProductsByCategoryId)

router.delete('/:id', productController.delete)

module.exports = router
