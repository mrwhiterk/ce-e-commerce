const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')

const { addProductToCart } = require('../controllers/cartController')

router.get('/', (req, res) => {
  Cart.findOne({ user: req.user.id })
    .populate('items.item')
    .exec((err, cart) => {
      if (err) throw err

      console.log('cart', cart)

      res.render('cart/cart', { cart })
    })
})

router.post('/product', addProductToCart)

router.get('/getShoppingCart', (req, res) => {})

module.exports = router
