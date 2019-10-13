let express = require('express');
let router = express.Router();

const userController = require('./controllers/userController');

let authChecker = require('../../utils/authChecker');

const signupValidation = require('./utils/signupValidation');



/* render signup page */
router.get('/signup', (req, res) => {
  console.log('auth ', req.isAuthenticated());
  if (req.isAuthenticated()) return res.redirect('/');

  res.render('auth/signup', {
    errors: req.flash('errors'),
    errorMessage: null
  });
});

/* submit signup form */
router.post('/signup', signupValidation, userController.signup);

/* render login form */
router.get('/login', (req, res) => {
  // req.flash('testError', 'some error');
  res.render('auth/login', { errors: [] });
});

/* submit login form */
router.post('/login', async (req, res) => {
  // console.log('data from flash ', req.flash('testError'));

  try {
    let user = await userController.login(req.body);
    console.log('user ', user)
    if (user) {
      res.render('index', { successMessage: 'Successfully logged in' });
    }
  } catch (error) {
    res.render('auth/login', { errors: [error] });
  }
});

module.exports = router;
