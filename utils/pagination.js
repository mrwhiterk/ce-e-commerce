const Product = require('../models/Product')

module.exports = {
  paginate: (req, res, next) => {
    const perPage = 10
    const page = req.params.page || 1

    Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, products) => {
        if (err) return next(err)
        Product.count().exec((err, count) => {
          if (err) return next(err)

          res.render('products/products', {
            products,
            current: page,
            pages: Math.ceil(count / perPage)
          })
        })
      })
  }
}
