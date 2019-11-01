const Product = require('../models/Product')
const faker = require('faker')
const elasticSearchMap = require('../utils/elasticSearch')

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

      elasticSearchMap()

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
      elasticSearchMap()

      req.flash('success', `product: ${product.name} was successfully deleted`)

      res.redirect('back')
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
  },

  searchProductByAjax: (req, res) => {
    const { query } = req.query
    Product.find({ name: { $regex: new RegExp(query), $options: 'i' } })
      .populate('category')
      .exec((err, products) => {
        if (err) {
          return res.send({ err })
        }

        res.send({ products })
      })
  },

  searchProductByQuery: (req, res) => {
    if (req.query.q) {
      Product.search(
        {
          query_string: {
            query: req.query.q
          }
        },
        (err, data) => {
          if (err) throw err

          const products = data.hits.hits

          res.render('search/searchResults', {
            products,
            query: req.query.q
          })
        }
      )
    }
  }
}
