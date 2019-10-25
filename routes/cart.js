const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const Product = require('../models/Product')

const {
  addProductToCart,
  showUserCart
} = require('../controllers/cartController')

router.get('/', showUserCart)

router.post('/product', addProductToCart)

router.get('/getShoppingCart', (req, res) => {})

router.delete('/removeProduct/:id', (req, res) => {
  Cart.findOne({ user: req.user.id }).populate('items.item').exec((err, cart) => {
    if (err) throw err

    let productToDeleteName = ''
    // id and _id work differently here.. why?
    cart.items = cart.items.filter(order => {
      if (order.id === req.params.id) {
        productToDeleteName = order.item.name
        return false
      }
      return true
    })

    cart.save((err, updatedCart) => {
      if (err) throw err

      req.flash('success', `successfully removed product: ${productToDeleteName}`)
      res.redirect('back')
    })
  })
})

module.exports = router
