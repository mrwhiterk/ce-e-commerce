const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const flash = require('connect-flash')
const passportSetup = require('./lib/passport/setup')

const {
  indexRouter,
  usersRouter,
  productsRouter,
  adminsRouter,
  cartsRouter
} = require('./routes')

const expressValidator = require('express-validator')
const app = express()
const methodOverride = require('method-override')
const Category = require('./models/Category')
const cartMiddleWare = require('./utils/cart')

require('dotenv').config()
require('./db')

app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

passportSetup(app)

app.use(flash())

app.use(
  expressValidator({
    errorFormatter: (param, message, value) => {
      const namespace = param.split('.')
      const root = namespace.shift()
      let formParam = root

      while (namespace.length) {
        formParam += `[${namespace.shift()}]`
      }

      return {
        param: formParam,
        message,
        value
      }
    }
  })
)
app.use(cartMiddleWare)
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.admin = req.flash('admin')
  next()
})

app.use(async (req, res, next) => {
  try {
    res.locals.categories = await Category.find()
  } catch (err) {
    req.flash('errors', err)
  }
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/admin', adminsRouter)
app.use('/cart', cartsRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
