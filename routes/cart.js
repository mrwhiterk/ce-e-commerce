const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Product = require('../models/Product')

const {
  addProductToCart,
  showUserCart,
  removeProductFromCart
} = require('../controllers/cartController')

router.get('/', showUserCart)

router.post('/product', addProductToCart)

router.delete('/removeProduct/:id', removeProductFromCart)

module.exports = router
