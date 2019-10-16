const express = require('express')
const indexRouter = express.Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const adminsRouter = require('./admins')

/* GET home page. */
indexRouter.get('/', (req, res) => {
  res.render('index')
})

module.exports = { indexRouter, usersRouter, productsRouter, adminsRouter }
