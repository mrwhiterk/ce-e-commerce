const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  getProductsByCategoryId,
  deleteProduct,
  searchProductByQuery,
  searchProductByAjax
} = require('../controllers/productController')

// localhost:3000/products/
router.get('/', getProducts)

router.get('/searchByAjax', searchProductByAjax)

router.get('/search', searchProductByQuery)

router.get('/:id', getProductById)

router.get('/findByCategory/:id', getProductsByCategoryId)

router.delete('/:id', deleteProduct)

module.exports = router
