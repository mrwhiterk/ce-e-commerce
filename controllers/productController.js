const Product = require('../models/Product')
const faker = require('faker')

module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find()
        .populate('category')
        .exec()

      res.render('products/products', { products })
    } catch (err) {
      if (err) throw err
    }
  },

  seedProducts: async (req, res) => {
    const newProducts = []
    for (let i = 0; i < 10; i++) {
      newProducts.push({
        category: req.params.id,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image()
      })
    }
    try {
      const products = await Product.create(newProducts)

      req.flash('success', `created ${products.length} products`)
      res.redirect('/admin')
    } catch (err) {
      if (err) throw err
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)

      res.render('products/product', { product })
    } catch (err) {
      if (err) throw err
    }
  },

  getProductsByCategoryId: async (req, res) => {
    try {
      const products = await Product.find({ category: req.params.id })
        .populate('category')
        .exec()

      res.render('products/products', { products })
    } catch (err) {
      if (err) throw err
    }
  },

  delete: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      res.json({
        confirmation: 'success',
        message: `product: ${product.name} was successfully deleted`
      })
    } catch (err) {
      if (err) throw err
    }
  }
}