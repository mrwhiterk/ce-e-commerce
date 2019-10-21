const Product = require('../models/Product')
const faker = require('faker')

module.exports = {
  getProducts: (req, res) => {
    Product.find({}, (err, products) => {
      if (err) throw err

      res.render('products/products', { products })
    })
  },
  createById: (req, res) => {
    const newProducts = []
    for (let i = 0; i < 10; i++) {
      newProducts.push({
        category: req.params.id,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl()
      })
    }
    Product.create(newProducts, (err, products) => {
      if (err) throw err

      req.flash('success', `created ${products.length} products`)
      res.redirect('/admins')
    })
  },
  getProductById: (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if (err) throw err

      res.render('products/product', { product })
    })
  },
  getProductsByCategoryId: (req, res) => {
    Product.find({ category: req.params.id }, (err, products) => {
      if (err) throw err

      res.render('products/products', { products })
    })
  }
}
