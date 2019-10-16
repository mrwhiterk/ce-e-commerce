const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('products/addCategory')
})

router.post('/', (req, res) => {
  res.send('add category goes here')
})

module.exports = router
