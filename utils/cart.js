const Cart = require('../models/Cart')

module.exports = (req, res, next) => {
  if (req.user) {
    Cart.findOne({ user: req.user.id }, (err, cart) => {
      if (err) throw err

      res.locals.total = cart.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      )

      next()
    })
  } else {
    res.locals.total = 0
    return next()
  }
}
