const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

const {
  addProductToCart,
  showUserCart
} = require('../controllers/cartController')

router.get('/', showUserCart)

router.post('/product', addProductToCart)

router.get('/getShoppingCart', (req, res) => {})

router.delete('/removeProduct', (req, res) => {
  Cart.sayHi()
  res.send('cannot delete')
})

module.exports = router
