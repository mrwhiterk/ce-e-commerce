const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  name: { type: String, default: '' },
  price: { type: Number, default: 0 },
  image: { type: String, default: '' }
})

module.exports = mongoose.model('Product', ProductSchema)
