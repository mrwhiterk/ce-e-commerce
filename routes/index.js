const express = require('express')
const indexRouter = express.Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const adminsRouter = require('./admin')
const indexController = require('../controllers')
const productController = require('../controllers/productController')
const paginate = require('../utils/pagination')

indexRouter.get('/', productController.getPageIfUserLoggedIn)

indexRouter.get('page/:page', paginate.paginate)

module.exports = { indexRouter, usersRouter, productsRouter, adminsRouter }
