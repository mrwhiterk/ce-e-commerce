const User = require('../../models/User')

const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local')

module.exports = passport => {
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id)
      done(null, user)
    } catch (error) {
      done(error, null)
    }
  })

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email }, async (error, user) => {
          // TODO fix this to always get error
         
          if (error) return done(error, null)

          if (!user) {
            return done(
              null,
              false,
              req.flash('errors', 'User does not exist!')
            )
          }

          try {
            const result = await bcrypt.compare(password, user.password)
            if (!result) {
              return done(
                null,
                false,
                req.flash('errors', 'Check email or password!')
              )
            } else {
              return done(null, user)
            }
          } catch (error) {
            return done(error, null)
          }
        })
      }
    )
  )
}
