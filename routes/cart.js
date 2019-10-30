const express = require('express')
const router = express.Router()
const async = require('async')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const Cart = require('../models/Cart')

const {
  addProductToCart,
  showUserCart,
  removeProductFromCart
} = require('../controllers/cartController')

router.get('/', showUserCart)

router.post('/product', addProductToCart)

router.delete('/removeProduct/:id', removeProductFromCart)

router.post('/payment', (req, res, next) => {
  const stripeToken = req.body.stripeToken
  const currentCharges = req.body.stripeMoney * 100

  stripe.customers
    .create({
      source: stripeToken
    })
    .then(customer => {
      const result = stripe.charges.create({
        amount: currentCharges,
        currency: 'usd',
        customer: customer.id
      })

      return result
    })
    .then(result => {
      async.waterfall([
        callback => {
          Cart.findOne(
            {
              user: req.user.id
            },
            (err, cart) => {
              callback(err, cart)
            }
          )
        },
        (cart, callback) => {
          cart.items.forEach(order => {
            req.user.orderHistory.push({ item: order.item, paid: order.price })
          })

          req.user.save((err, user) => {
            if (err) throw err

            console.log('user successfully updated')
          })

          callback(null, cart)
        },
        cart => {
          cart.items = []
          cart.save((err, cart) => {
            if (err) throw err

            console.log('cart successfully updated')
          })
          req.flash('success', 'successfully purchased')
          res.render('account/purchase-complete')
        }
      ])
    })
    .catch(err => {
      throw new Error(err)
    })
})

module.exports = router
