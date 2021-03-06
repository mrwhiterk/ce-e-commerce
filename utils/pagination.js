const Product = require('../models/Product')

module.exports = {
  paginate: (req, res, next) => {
    const perPage = 9
    const page = req.params.page || 1

    Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate('category')
      .exec((err, products) => {
        if (err) return next(err)
        Product.countDocuments().exec((err, count) => {
          if (err) return next(err)

          res.render('products/', {
            products,
            current: page,
            pages: Math.ceil(count / perPage)
          })
        })
      })
  }
}
