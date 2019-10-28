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
  },
  showUserCart: (req, res) => {
    Cart.findOne({ user: req.user.id })
      .populate('items.item')
      .exec((err, cart) => {
        if (err) throw err
        console.log(cart)
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
