const express = require('express')
const router = express.Router()
const async = require('async')
const stripe = require('stripe')('sk_test_joQddhSvaueVJsBr8ExqUkA900EKvH0vNb')
const Cart = require('../models/Cart')
const User = require('../models/User')

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
  console.log(stripeToken)
  console.log(req.body)

  stripe.customers
    .create({
      source: stripeToken
    })
    .then(customer => {
      console.log('hit')
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
          console.log('line 50', cart)

          cart.items.forEach(order => {
            req.user.orderHistory.push({ item: order.item, paid: order.price })
          })

          req.user.save((err, user) => {
            if (err) throw err

            console.log('user successfully updated')
          })

          callback(null, cart)

          // Add items to user history
          // erase everything from cart

          // display message ('charged')
        },
        cart => {
          cart.items = []
          cart.save((err, cart) => {
            if (err) throw err

            console.log('cart successfully updated')
          })
          res.send('updated history')
        }
      ])
    })
    .catch(err => {
      throw new Error(err)
    })

  // async waterfall
  // async.waterfall([myFirstFunction, mySecondFunction, myLastFunction], function(
  //   err,
  //   result
  // ) {
  //   if (err) throw err
  //   // result now equals 'Task1 and Task2 completed'
  //   console.log(result)
  // })

  // function myFirstFunction (callback) {
  //   callback(null, 'Task 1', 'Task 2')
  // }
  // function mySecondFunction (arg1, arg2, callback) {
  //   // arg1 now equals 'Task 1' and arg2 now equals 'Task 2'
  //   let arg3 = arg1 + ' and ' + arg2
  //   callback(null, arg3)
  // }
  // function myLastFunction (arg1, callback) {
  //   // arg1 now equals 'Task1 and Task2'
  //   arg1 += ' completed'
  //   callback(null, arg1)
  // }
})

module.exports = router
