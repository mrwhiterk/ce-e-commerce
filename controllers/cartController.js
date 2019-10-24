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
  },
  addProductToCart: (req, res) => {
    console.log('reqqqq', req.body)
    Cart.findOne({ user: req.user.id }, (err, cart) => {
      if (err) throw err

      const newQuantity = parseInt(req.body.quantity)

      cart.items.push({
        price: req.body.priceValue,
        quantity: newQuantity,
        item: req.body.productID
      })

      cart.total = (cart.total + newQuantity).toFixed(2)

      cart.save((err, cart) => {
        if (err) throw err

        req.flash('success', 'successfully updated cart: ', cart)
        res.redirect('/cart')
      })
    })
  }
}
