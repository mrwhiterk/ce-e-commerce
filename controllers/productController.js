const Product = require('../models/Product')
const faker = require('faker')

module.exports = {
  getProducts: (req, res) => {
    Product.find({})
      .populate('category')
      .exec((err, products) => {
        if (err) throw err

        res.render('products/products', { products })
      })
  },

  seedProducts: (req, res) => {
    const newProducts = []
    for (let i = 0; i < 10; i++) {
      newProducts.push({
        category: req.params.id,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image()
      })
    }
    Product.create(newProducts, (err, products) => {
      if (err) throw err

      req.flash('success', `created ${products.length} products`)
      res.redirect('/admin')
    })
  },

  getProductById: (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) throw err

      res.render('products/product', { product })
    })
  },

  getProductsByCategoryId: (req, res) => {
    Product.find({ category: req.params.id })
      .populate('category')
      .exec((err, products) => {
        if (err) throw err

        res.render('products/products', { products })
      })
  }
}
