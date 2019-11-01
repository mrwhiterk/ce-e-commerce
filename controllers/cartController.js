const Cart = require('../models/Cart')
const chalk = require('chalk')

module.exports = {
  create: (req, res) => {
    Cart.create(
      {
        user: req.user.id
      },
      (err, cart) => {
        if (err) throw err
        req.flash('success', `successfully created ${cart}`)
        res.redirect(301, '/')
      }
    )
  },
  addProductToCart: (req, res) => {
    Cart.findOne({ user: req.user.id }, (err, cart) => {
      if (err) throw err

      cart.items.push({
        price: req.body.priceValue,
        quantity: parseInt(req.body.quantity),
        item: req.body.productID
      })

      cart.save((err, cart) => {
        if (err) throw err

        req.flash('success', `successfully added ${req.body.item} to cart`)
        res.redirect('back')
      })
    })
  },
  showUserCart: (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate('items.item')
      .exec((err, cart) => {
        if (err) throw err
        res.render('cart/cart', { cart })
      })
  },
  removeProductFromCart: (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate('items.item')
      .exec((err, cart) => {
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
        // or pull 😝
        // cart.items.pull(req.params.id)

        cart.save((err, updatedCart) => {
          if (err) throw err

          req.flash(
            'success',
            `successfully removed product: ${productToDeleteName}`
          )
          res.redirect('back')
        })
      })
  }
}
