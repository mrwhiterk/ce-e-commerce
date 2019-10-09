let express = require('express');
let router = express.Router();

const userController = require('./controllers/userController');

let authChecker = require('../../utils/authChecker');

/* TODO: GET users listing. */

/* render signup page */
router.get('/signup', (req, res) => {
  res.render('auth/signup', { errors: [] });
});

/* submit signup form */
router.post('/signup', authChecker, (req, res, next) => {
  let errors = req.validationErrors();
  
    console.log('users.js 19: errors ', errors)
    if (errors) {
      res.render('auth/signup', {
        errors,
        successMessage: false,
        user: req.body
      });
    } else {
      next();
    }
  
  }, (req, res) => {
  userController
    .signup(req.body)
    .then(user => {
      res.redirect('/');
    })
    .catch(error => {
      res.render('auth/signup', { errors: [error] })
    });
});

/* render login form */
router.get('/login', (req, res) => {
  res.render('auth/login', { errors: [] });
})

/* submit login form */
router.post('/login',(req, res) => {
  userController
    .login(req.body)
    .then(user => {
      res.render('index', {successMessage: 'Successfully logged in'});
    })
    .catch(error => {
      console.log('error', error);
      res.render('auth/login', { errors: [error] })
    })
})

module.exports = router;
