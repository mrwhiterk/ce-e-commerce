const Category = require('../models/Category')

function showAddCategory (req, res) {
  res.render('products/addCategory')
}

async function getCategories (req, res) {
  try {
    const categories = await Category.find()
    // req.flash('success', 'successfully got categories')

    res.render('categories/createFakeProduct', { categories, success: req.flash('success') })
  } catch (err) {
    req.flash('errors', err)
    res.render('categories/createFakeProduct')
  }
}

async function addCategory (req, res) {
  if (req.validationErrors()) {
    req.flash('errors', req.validationErrors())
  } else {
    try {
      const data = await Category.create({ name: req.body.name })
      req.flash('success', `successfully created ${data.name}`)
    } catch (err) {
      if (err.code === 11000) {
        req.flash('errors', `${req.body.name} already exist`)
      } else {
        req.flash('errors', 'error occured')
      }
    }
  }
  res.redirect('/admin/new')
}

module.exports = {
  getCategories,
  addCategory,
  showAddCategory
}
