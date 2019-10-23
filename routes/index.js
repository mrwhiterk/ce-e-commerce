const express = require('express')
const indexRouter = express.Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const adminsRouter = require('./admin')
const { getPageIfUserLoggedIn } = require('../controllers/productController')
const { paginate } = require('../utils/pagination')

indexRouter.get('/', getPageIfUserLoggedIn)

indexRouter.get('/page/:page', paginate)

module.exports = { indexRouter, usersRouter, productsRouter, adminsRouter }
