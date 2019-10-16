const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')

const indexRouter = require('./routes')
const usersRouter = require('./routes/users')

const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

const expressValidator = require('express-validator')
const app = express()

require('dotenv').config()

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(data => {
    console.log('DB Connected')
  })
  .catch(err => console.log(err))

// view engine setup
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

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
  res.locals.errorValidate = req.flash('errorValidate')
  res.locals.loginMessage = req.flash('loginMessage')
  res.locals.success = req.flash('success')
  next()
})

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
