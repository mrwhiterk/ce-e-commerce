const Cart = require('../models/Cart')

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
  }
}
