const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('products/addCategory')
})

router.post('/addCategory', (req, res) => {
  res.send('add cate')
})

module.exports = router
