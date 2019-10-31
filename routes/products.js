const express = require('express')
const router = express.Router()
const {
  getProducts,
  getProductById,
  getProductsByCategoryId,
  deleteProduct,
  searchProductByQuery
} = require('../controllers/productController')

const Product = require('../models/Product')

// elastic search

Product.createMapping((err, mapping) => {
  if (err) throw err

  console.log('successfully mapped')
})

const stream = Product.synchronize()
let count = 0

stream.on('data', () => {
  count++
})

stream.on('close', () => {
  console.log(`Indexed ${count} document`)
})

stream.on('error', error => {
  console.log('Error', error)
})

// localhost:3000/products/
router.get('/', getProducts)

router.get('/searchByJQuery', (req, res) => {
  const { query } = req.query
  Product.find(
    { name: { $regex: new RegExp(query), $options: 'i' } },
    (err, products) => {
      if (err) {
        return res.send({ err })
      }
      console.log(products)
      res.send({ products })
    }
  )
})

router.get('/search', searchProductByQuery)

router.get('/:id', getProductById)

router.get('/findByCategory/:id', getProductsByCategoryId)

router.delete('/:id', deleteProduct)

module.exports = router
