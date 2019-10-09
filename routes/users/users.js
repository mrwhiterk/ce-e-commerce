var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', (req, res) => {
  res.render('auth/signup', { errors: []})
})

router.post('/signup', (req, res) => {
  console.log('req.body', req.body)
  res.send('Got it')
})

module.exports = router;
