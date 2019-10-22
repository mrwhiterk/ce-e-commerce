const express = require('express')
const indexRouter = express.Router()
const usersRouter = require('./users')
const productsRouter = require('./products')
const adminsRouter = require('./admin')
const indexController = require('../controllers')

indexRouter.get('/', indexController.index)

module.exports = { indexRouter, usersRouter, productsRouter, adminsRouter }
