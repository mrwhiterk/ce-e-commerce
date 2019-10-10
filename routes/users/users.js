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
  /* capture validations from authChecker */
  let errors = req.validationErrors();
  
  if (errors) {
    res.render('auth/signup', {
      errors,
      successMessage: false
    });
  } else {
    // invoke signup promise and catch errors from auth checker, mongo, and controller at once.
    userController
      .signup(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch(error => {
        console.log('error: ', error)
        res.render('auth/signup', { errors: [error] });
      });
  }
  
});

/* render login form */
router.get('/login', (req, res) => {
  res.render('auth/login', { errors: [] });
});

/* submit login form */
router.post('/login', (req, res) => {
  userController
    .login(req.body)
    .then(user => {
      res.render('index', { successMessage: 'Successfully logged in' });
    })
    .catch(error => {
      res.render('auth/login', { errors: [error] });
    });
});

module.exports = router;
