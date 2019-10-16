const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const flash = require('connect-flash')
const passport = require('passport')
const { indexRouter, usersRouter } = require('./routes')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const expressValidator = require('express-validator')
const app = express()
const methodOverride = require('method-override')

require('dotenv').config()
require('./db')

// view engine setup
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.use(
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

app.use(flash())

require('./lib/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

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

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')

  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
