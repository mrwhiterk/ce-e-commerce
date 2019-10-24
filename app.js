const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const flash = require('connect-flash')
const passport = require('passport')
const {
  indexRouter,
  usersRouter,
  productsRouter,
  adminsRouter,
  cartsRouter
} = require('./routes')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const expressValidator = require('express-validator')
const app = express()
const methodOverride = require('method-override')
const Category = require('./models/Category')
const cartMiddleWare = require('./utils/cart')

require('dotenv').config()
require('./db')

app
  .set('view engine', 'ejs')

  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, 'public')))
  .use(methodOverride('_method'))

  .use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET,
      store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true
      }),
      cookie: {
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    })
  )

  .use(flash())

require('./lib/passport')(passport)
app
  .use(passport.initialize())

  .use(passport.session())

  .use(
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

  .use((req, res, next) => {
    res.locals.user = req.user
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')

    next()
  }, cartMiddleWare)

  .use(async (req, res, next) => {
    try {
      res.locals.categories = await Category.find()
    } catch (err) {
      req.flash('errors', err)
    }
    next()
  })

  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/products', productsRouter)
  .use('/admin', adminsRouter)
  .use('/cart', cartsRouter)

  .use((req, res, next) => {
    next(createError(404))
  })

  // error handler
  .use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

module.exports = app
