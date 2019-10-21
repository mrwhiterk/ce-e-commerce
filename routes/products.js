const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)

router.get('/:id', productController.getProductById)

router.get('/category/:id', productController.getProductsByCategoryId)

module.exports = router
