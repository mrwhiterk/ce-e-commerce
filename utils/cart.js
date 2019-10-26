const Cart = require('../models/Cart')

module.exports = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ user: req.user.id }, (err, cart) => {
      if (err) throw err

      res.locals.totalCartItems = cart.totalQuantity
      next()
    })
  } else {
    res.locals.totalCartItems = 0
    next()
  }
}
