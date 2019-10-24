const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

module.exports = app => {
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

  require('./index')(passport)
  app.use(passport.initialize())
  app.use(passport.session())
}
