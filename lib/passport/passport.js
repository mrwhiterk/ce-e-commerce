const User = require('../../routes/users/models/User');

const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

/**
 * Visual flow
 * 
passport.serializeUser(function(user, done) {
    done(null, user.id);
});              │
                 │ 
                 │
                 └─────────────────┬──→ saved to session
                                   │    req.session.passport.user = {id: '..'}
                                   │
                                   ↓           
passport.deserializeUser(function(id, done) {
                   ┌───────────────┘
                   │
                   ↓ 
    User.findById(id, function(err, user) {
        done(err, user);
    });            └──────────────→ user object attaches to the request as req.user   
});
 */

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        User.findOne({ email: email }, (error, user) => {
          if (error) return done(error, null);

          if (!user) {
            return done(
              null,
              false,
              req.flash('loginMessage', 'User does not exist!')
            );
          }

          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (!result) {
                return done(
                  null,
                  false,
                  req.flash('loginMessage', 'Check email or password!')
                );
              } else {
                return done(null, user);
              }
            })
            .catch(error => {
              throw error;
            });
        });
      }
    )
  );
};
