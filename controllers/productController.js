const Product = require('../models/Product')
const faker = require('faker')

const { paginate } = require('../utils/pagination')

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
        image: 'https://www.fillmurray.com/500/500'
      })
    }
    try {
      const products = await Product.create(newProducts)

      req.flash('success', `created ${products.length} products`)
      res.render('categories/createFakeProduct', {
        products,
        success: req.flash('success')
      })
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

  deleteProduct: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      res.json({
        confirmation: 'success',
        message: `product: ${product.name} was successfully deleted`
      })
    } catch (err) {
      if (err) throw err
    }
  },

  getPageIfUserLoggedIn: (req, res, next) => {
    if (req.user) {
      paginate(req, res, next)
    } else {
      res.render('index')
    }
  }
}
