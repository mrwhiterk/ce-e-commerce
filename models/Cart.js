const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  total: { type: Number, default: 0 },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: { type: Number, default: 0 },
      price: { type: Number, default: 0 }
    }
  ]
})

const Cart = mongoose.model('Cart', CartSchema)

Cart.sayHi = function () {
  console.log('hi')
}

module.exports = Cart
