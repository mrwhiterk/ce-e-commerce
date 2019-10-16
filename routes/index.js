const express = require('express')
const indexRouter = express.Router()
const usersRouter = require('./users')

/* GET home page. */
indexRouter.get('/', (req, res) => {
  res.render('index')
})

module.exports = { indexRouter, usersRouter }
