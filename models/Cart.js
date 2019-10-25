const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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

CartSchema.method('getTotalPrice', function () {
  return this.items.reduce((acc, item) => acc + Number(item.price), 0)
})

CartSchema.method('getTotalQuantity', function () {
  return this.items.reduce((acc, item) => acc + Number(item.quantity), 0)
})

module.exports = mongoose.model('Cart', CartSchema)
