var express = require('express');
var router = express.Router();

const userController = require('./controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', { errors: [] });
});

router.post('/signup', (req, res) => {
  userController
    .signup(req.body)
    .then(user => {
      res.redirect('/');
    })
    .catch(error => {
      console.log('error: ', error)
      res.render('auth/signup', { errors: error })
    });
});

router.get('/login', (req, res) => {
  res.render('auth/login', { errors: [] });
})

router.post('/login', (req, res) => {
  userController
    .login(req.body)
    .then(user => {
      res.render('index', {successMessage: 'Successfully logged in'});
    })
    .catch(error => {
      console.log('error**: ', error)
      res.render('auth/login', { errors: [error.message] })
    })
})

module.exports = router;
